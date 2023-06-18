import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

// const iconPath = {
//   'arrow-down': "../../../assets/images/arrow-down.svg",
//   'arrow-up': "../../../assets/images/up.svg",
// }

export class IconComponent {
  private _iconName: string = '';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      "arrow-down",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/images/arrow-down.svg")
    );
  }

  @Input() set iconName(icon: string) {
    this._iconName = icon;
  }

  get iconName() {
    return this._iconName
  }
}
