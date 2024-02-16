import { Component, OnInit } from "@angular/core";
import { BasketComponent } from "../../shared/basket/basket.component";
import { Timestamp } from "@angular/fire/firestore";
import { Basket } from "../../core/models/basket";
import { FormsModule } from "@angular/forms";
import { initDrawers } from "flowbite";
import { ButtonComponent } from "../../components/button/button.component";
import { InputComponent } from "../../components/input/input.component";
import { TagsInputComponent } from "../../components/tags-input/tags-input.component";
import { ChoiceComponent } from "../../components/choice/choice.component";

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
  ],
  templateUrl: "./explore.component.html",
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
    total: 0,
  };

  searchQuery = "";
  filters = {
    maxDistance: 300,
    sortBy: "newest",
    tags: [],
  };

  ngOnInit() {
    initDrawers();
  }

  searchBaskets() {
    console.log(this.searchQuery);
  }

  filterBaskets() {
    console.log(this.filters);
  }
}
