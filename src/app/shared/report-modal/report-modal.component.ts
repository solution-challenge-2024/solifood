import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { initModals } from "flowbite";
import { ButtonComponent } from "../../components/button/button.component";
import { ChoiceComponent } from "../../components/choice/choice.component";
import { InputComponent } from "../../components/input/input.component";
import { FormsModule } from "@angular/forms";
import { BasketService } from "../../core/services/basket.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-report-modal",
  standalone: true,
  imports: [FormsModule, ButtonComponent, ChoiceComponent, InputComponent],
  templateUrl: "./report-modal.component.html",
})
export class ReportModalComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private basket = inject(BasketService);
  private toastr = inject(ToastrService);

  id: string | null = null;
  loading = false;

  report = {
    reason: ["other"],
    details: "",
  };

  ngOnInit() {
    initModals();
    this.id = this.route.snapshot.paramMap.get("id");
  }

  async reportAbuse() {
    this.loading = true;
    if (!this.id) {
      return;
    }

    await this.basket.reportAbuse(
      this.id,
      this.report.reason,
      this.report.details,
    );
    this.toastr.success(
      "Thank you for reporting this basket. We will review it soon.",
    );

    this.loading = false;
  }
}
