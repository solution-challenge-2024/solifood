import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { BasketComponent } from "../basket/basket.component";
import { Timestamp } from "@angular/fire/firestore";
import { Basket } from "../../core/models/basket";
import { FormsModule } from "@angular/forms";
import { initDrawers } from "flowbite";

@Component({
  selector: "app-explore",
  standalone: true,
  imports: [BasketComponent, FormsModule],
  templateUrl: "./explore.component.html",
  styleUrl: "./explore.component.scss",
})
export class ExploreComponent implements OnInit {
  baskets: Basket[] = [
    {
      id: "1",
      title: "Basket 1",
      description: "This is the description for Basket 1",
      images: [
        "https://images.radio-canada.ca/v1/alimentation/recette/16x9/ogleman-spaghetti-boulettes.jpg",
        "https://images.radio-canada.ca/v1/alimentation/recette/16x9/ogleman-spaghetti-boulettes.jpg",
      ],
      realPrice: 50,
      price: 40,
      location: { lat: 123.456, lon: 789.012 },
      available: true,
      blocked: false,
      tags: ["tag1", "tag2", "tag3"],
      ingredients: ["ingredient1", "ingredient2"],
      createdBy: {
        id: "user1",
        firstName: "John",
        lastName: "Doe",
        picture:
          "https://t3.ftcdn.net/jpg/04/23/59/74/360_F_423597477_AKCjGMtevfCi9XJG0M8jter97kG466y7.jpg",
        email: "john@example.com",
        location: { lat: 123.456, lon: 789.012 },
        ratings: [{ rating: 5, by: "user2" }],
        blocked: true,
        lastLogin: Timestamp.now(),
        joinedAt: Timestamp.now(),
      },
      expiredAt: Timestamp.now(),
      createdAt: Timestamp.now(),
    },
    {
      id: "2",
      title: "Basket 1",
      description: "This is the description for Basket 1",
      images: [
        "https://images.radio-canada.ca/v1/alimentation/recette/16x9/ogleman-spaghetti-boulettes.jpg",
        "https://images.radio-canada.ca/v1/alimentation/recette/16x9/ogleman-spaghetti-boulettes.jpg",
      ],
      realPrice: 50,
      price: 40,
      location: { lat: 123.456, lon: 789.012 },
      available: true,
      blocked: false,
      tags: ["tag1", "tag2", "tag3"],
      ingredients: ["ingredient1", "ingredient2"],
      createdBy: {
        id: "user1",
        firstName: "John",
        lastName: "Doe",
        picture:
          "https://t3.ftcdn.net/jpg/04/23/59/74/360_F_423597477_AKCjGMtevfCi9XJG0M8jter97kG466y7.jpg",
        email: "john@example.com",
        location: { lat: 123.456, lon: 789.012 },
        ratings: [{ rating: 5, by: "user2" }],
        blocked: true,
        lastLogin: Timestamp.now(),
        joinedAt: Timestamp.now(),
      },
      expiredAt: Timestamp.now(),
      createdAt: Timestamp.now(),
    },
    {
      id: "3",
      title: "Basket 1",
      description: "This is the description for Basket 1",
      images: [
        "https://images.radio-canada.ca/v1/alimentation/recette/16x9/ogleman-spaghetti-boulettes.jpg",
        "https://images.radio-canada.ca/v1/alimentation/recette/16x9/ogleman-spaghetti-boulettes.jpg",
      ],
      realPrice: 50,
      price: 40,
      location: { lat: 123.456, lon: 789.012 },
      available: true,
      blocked: false,
      tags: ["tag1", "tag2", "tag3"],
      ingredients: ["ingredient1", "ingredient2"],
      createdBy: {
        id: "user1",
        firstName: "John",
        lastName: "Doe",
        picture:
          "https://t3.ftcdn.net/jpg/04/23/59/74/360_F_423597477_AKCjGMtevfCi9XJG0M8jter97kG466y7.jpg",
        email: "john@example.com",
        location: { lat: 123.456, lon: 789.012 },
        ratings: [{ rating: 5, by: "user2" }],
        blocked: true,
        lastLogin: Timestamp.now(),
        joinedAt: Timestamp.now(),
      },
      expiredAt: Timestamp.now(),
      createdAt: Timestamp.now(),
    },
    {
      id: "4",
      title: "Basket 1",
      description: "This is the description for Basket 1",
      images: [
        "https://images.radio-canada.ca/v1/alimentation/recette/16x9/ogleman-spaghetti-boulettes.jpg",
        "https://images.radio-canada.ca/v1/alimentation/recette/16x9/ogleman-spaghetti-boulettes.jpg",
      ],
      realPrice: 50,
      price: 40,
      location: { lat: 123.456, lon: 789.012 },
      available: true,
      blocked: false,
      tags: ["tag1", "tag2", "tag3"],
      ingredients: ["ingredient1", "ingredient2"],
      createdBy: {
        id: "user1",
        firstName: "John",
        lastName: "Doe",
        picture:
          "https://t3.ftcdn.net/jpg/04/23/59/74/360_F_423597477_AKCjGMtevfCi9XJG0M8jter97kG466y7.jpg",
        email: "john@example.com",
        location: { lat: 123.456, lon: 789.012 },
        ratings: [{ rating: 5, by: "user2" }],
        blocked: true,
        lastLogin: Timestamp.now(),
        joinedAt: Timestamp.now(),
      },
      expiredAt: Timestamp.now(),
      createdAt: Timestamp.now(),
    },
    {
      id: "5",
      title: "Basket 1",
      description: "This is the description for Basket 1",
      images: [
        "https://images.radio-canada.ca/v1/alimentation/recette/16x9/ogleman-spaghetti-boulettes.jpg",
        "https://images.radio-canada.ca/v1/alimentation/recette/16x9/ogleman-spaghetti-boulettes.jpg",
      ],
      realPrice: 50,
      price: 40,
      location: { lat: 123.456, lon: 789.012 },
      available: true,
      blocked: false,
      tags: ["tag1", "tag2", "tag3"],
      ingredients: ["ingredient1", "ingredient2"],
      createdBy: {
        id: "user1",
        firstName: "John",
        lastName: "Doe",
        picture:
          "https://t3.ftcdn.net/jpg/04/23/59/74/360_F_423597477_AKCjGMtevfCi9XJG0M8jter97kG466y7.jpg",
        email: "john@example.com",
        location: { lat: 123.456, lon: 789.012 },
        ratings: [{ rating: 5, by: "user2" }],
        blocked: true,
        lastLogin: Timestamp.now(),
        joinedAt: Timestamp.now(),
      },
      expiredAt: Timestamp.now(),
      createdAt: Timestamp.now(),
    },
  ];
  pagination = {
    page: 1,
    pageSize: 12,
    total: 5,
  };
  @Output() chipsChange = new EventEmitter<string[]>();
  tags: string[] = [];
  inputValue: string = "";
  arr = Array;

  ngOnInit() {
    initDrawers();
  }

  addTag() {
    if (this.inputValue.trim() && !this.tags.includes(this.inputValue.trim())) {
      this.tags.push(this.inputValue.trim());
      this.inputValue = "";
      this.emitTags();
    }
  }

  removeTag(index: number) {
    this.tags.splice(index, 1);
    this.emitTags();
  }

  emitTags() {
    this.chipsChange.emit([...this.tags]);
  }
}
