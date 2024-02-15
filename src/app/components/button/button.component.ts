import { NgTemplateOutlet } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import {
  ButtonColors,
  ButtonSizes,
  buttonBaseClass,
  buttonColorClasses,
  buttonSizeClasses,
} from "./button.properties";

@Component({
  selector: "app-button",
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: "./button.component.html",
})
export class ButtonComponent implements OnInit {
  @Input() color: ButtonColors = "primary";
  @Input() size: ButtonSizes = "md";
  @Input() class: string = "";
  @Input() pill: boolean = false;
  @Input() preIcon: string | null = null;
  @Input() postIcon: string | null = null;
  @Input() type: "button" | "submit" | "reset" = "button";

  @Input()
  set disabled(value: boolean) {
    this.buttonClasses = value
      ? this.buttonClasses.concat("opacity-50", "pointer-events-none")
      : this.buttonClasses.filter(
          (c) => c !== "opacity-50" && c !== "pointer-events-none",
        );
  }

  buttonClasses = buttonBaseClass;

  ngOnInit(): void {
    // Add custom classes
    this.buttonClasses.push(...this.class.split(" "));

    // Add color classes
    this.buttonClasses.push(...buttonColorClasses[this.color]);

    // Add size classes
    this.buttonClasses.push(...buttonSizeClasses[this.size]);

    // Add pill classes
    this.buttonClasses.push(this.pill ? "rounded-full" : "rounded-lg");
  }
}
