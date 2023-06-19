import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export type IconName =
  'arrow-down-icon' |
  'arrow-up-icon' |
  'login-icon' |
  'logout-icon' |
  'search-icon' |
  'settings-icon';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class IconComponent {
  private _iconName!: IconName;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) { }

  @Input() set iconName(icon: IconName) {
    this._iconName = icon;
    this.matIconRegistry.addSvgIcon(
      icon,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/images/${icon}.svg`)
    );
  }

  get iconName() {
    return this._iconName;
  }
}
