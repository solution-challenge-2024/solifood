import { Component } from "@angular/core";
import { Basket } from "../../core/models/basket";
import { Timestamp } from "@angular/fire/firestore";
import { ButtonComponent } from "../../components/button/button.component";
import dayjs from "dayjs";

@Component({
  selector: "app-basket",
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: "./basket.component.html",
})
export class BasketComponent {
  basket: Basket = {
    id: "1",
    title: "Basket 1",
    description:
      "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker",
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
  };

  timeAgo(date: Date): string {
    return dayjs(date).fromNow();
  }
}
