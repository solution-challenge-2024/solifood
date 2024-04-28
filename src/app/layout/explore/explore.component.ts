import { Component, OnInit, inject } from "@angular/core";
import { BasketComponent } from "../../shared/basket/basket.component";
import { FormsModule } from "@angular/forms";
import { initDrawers } from "flowbite";
import { ButtonComponent } from "../../components/button/button.component";
import { InputComponent } from "../../components/input/input.component";
import { TagsInputComponent } from "../../components/tags-input/tags-input.component";
import { ChoiceComponent } from "../../components/choice/choice.component";
import { LoadingComponent } from "../../components/loading/loading.component";
import { StorageService } from "../../core/data/storage.service";
import { BasketService } from "../../core/services/basket.service";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { NoDataComponent } from "../../components/no-data/no-data.component";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { Layer, MapOptions, icon, marker, tileLayer } from "leaflet";
import { Router } from "@angular/router";
import { Basket } from "../../core/models/basket";
import dayjs from "dayjs";

@Component({
  selector: "app-explore",
  standalone: true,
  imports: [
    BasketComponent,
    FormsModule,
    ButtonComponent,
    InputComponent,
    TagsInputComponent,
    ChoiceComponent,
    LoadingComponent,
    InfiniteScrollModule,
    NoDataComponent,
    LeafletModule,
  ],
  templateUrl: "./explore.component.html",
})
export class ExploreComponent implements OnInit {
  public storage = inject(StorageService);
  private basket = inject(BasketService);
  private router = inject(Router);

  basketsLoading = false;
  isMapView = false;

  searchQuery = "";
  isSearchMode = false;
  filters = {
    maxDistance: 300,
    sortBy: "newest",
    tags: [],
  };

  mediaRecorder: MediaRecorder | null = null;
  recording = false;
  chunks: Blob[] = [];

  mapOptions: MapOptions = {
    layers: [
      tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
      }),
    ],
    zoom: 5,
    center: [0, 0],
  };

  layers: Layer[] = [];

  async ngOnInit() {
    initDrawers();

    // Load baskets
    if (!this.storage.basketsState.loaded) {
      await this.loadBaskets();
    }

    // Plot baskets on map
    this.plotBasketsOnMap();
  }

  async handleScroll() {
    if (
      this.basketsLoading ||
      this.storage.basketsState.endReached ||
      this.isSearchMode
    )
      return;

    this.basketsLoading = true;
    await this.loadBaskets();
    this.plotBasketsOnMap();
    this.basketsLoading = false;
  }

  async loadBaskets() {
    // Get last result to start after
    this.storage.basketsState.endReached = false;
    const basketsCount = this.storage.basketsState.baskets.length;
    const lastResult =
      basketsCount > 0
        ? this.storage.basketsState.baskets[basketsCount - 1]
        : null;

    // Get baskets
    const baskets = await this.basket.getBaskets(lastResult);

    // If no baskets, end reached
    if (baskets.length === 0) {
      this.storage.basketsState.endReached = true;
      return;
    }

    // Add baskets to storage
    this.storage.basketsState.baskets = [
      ...this.storage.basketsState.baskets,
      ...baskets,
    ];
    this.storage.basketsState.loaded = true;
  }

  plotBasketsOnMap() {
    this.layers = [];

    this.storage.basketsState.baskets.forEach((basket) => {
      this.layers.push(
        marker([basket.location.lat, basket.location.lon], {
          icon: icon({
            iconUrl: "/assets/marker-icon.png",
            iconAnchor: [19, 35],
          }),
        })
          .on("click", (event) => {
            this.router.navigate(["/explore", basket.id]);
          })
          .bindPopup(
            `
            <div class="font-bold mb-[5px]">${basket.title}</div>
            <div class="d-flex gap-2 items-center mb-[10px] text-gray-500">
              <span>0.3km</span>
              -
              <span>${this.is_expired(basket) ? "Expired" : "Available"}</span>
            </div>
            <div>${basket.description}</div>
          `,
            {
              offset: [0, -30],
            },
          )
          .on("mouseover", (event) => {
            event.target.openPopup();
          }),
      );
    });
  }

  async searchBaskets() {
    if (!this.searchQuery) return;
    this.basketsLoading = true;
    this.storage.basketsState.endReached = false;

    // Reset baskets
    this.storage.basketsState.baskets = [];

    // Get baskets ID from the search API
    this.storage.basketsState.baskets = await this.basket.searchBaskets(
      this.searchQuery,
    );
    this.storage.basketsState.endReached = true;
    this.plotBasketsOnMap();
    this.basketsLoading = false;
    this.isSearchMode = true;
  }

  async resetSearch() {
    this.searchQuery = "";
    this.isSearchMode = false;
    this.basketsLoading = true;
    this.recording = false;
    this.chunks = [];

    // Reset baskets
    this.storage.basketsState.baskets = [];

    // Load baskets
    await this.loadBaskets();
    this.plotBasketsOnMap();
    this.basketsLoading = false;
  }

  async startRecording() {
    this.recording = true;

    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          this.mediaRecorder = new MediaRecorder(stream);
          this.mediaRecorder.start();
          this.mediaRecorder.ondataavailable = (e) => {
            this.chunks.push(e.data);
          };
        })
        .catch((err) => {
          console.error(`The following error occurred: ${err}`);
        });
    }
  }

  async voiceSearch() {
    if (!this.mediaRecorder) return;
    this.basketsLoading = true;
    this.storage.basketsState.endReached = false;
    this.mediaRecorder.stop();

    // Reset baskets
    this.storage.basketsState.baskets = [];

    this.mediaRecorder.onstop = async () => {
      // Get baskets ID from the search API
      const result = await this.basket.searchBasketsByAudio(
        new Blob(this.chunks, { type: "audio/mpeg" }),
        "audio/mpeg",
      );

      console.log(result);

      this.storage.basketsState.baskets = result.baskets;
      this.searchQuery = result.query;

      this.plotBasketsOnMap();

      this.basketsLoading = false;
      this.storage.basketsState.endReached = true;
      this.isSearchMode = true;
      this.recording = false;
      this.mediaRecorder = null;
    };
  }

  filterBaskets() {
    console.log(this.filters);
  }

  is_expired(basket: Basket): boolean {
    if (!basket) return false;

    const now = dayjs();
    const expiredAt = dayjs(basket.expiredAt.toDate());

    return expiredAt.isBefore(now);
  }
}
