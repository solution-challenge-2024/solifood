import { Component, Input } from "@angular/core";

@Component({
  selector: "app-user-avatar",
  standalone: true,
  imports: [],
  templateUrl: "./user-avatar.component.html",
})
export class UserAvatarComponent {
  @Input() user = {
    picture: "/assets/user.svg",
    displayName: "Unknown",
  };
  @Input() size = 10;
  @Input() showName = false;
}
