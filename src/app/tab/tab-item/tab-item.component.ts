import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  Renderer,
  ViewChildren,
} from '@angular/core';

import { HandlePropChanges } from '../../shared/handle-prop-changes';

@Component({
  selector: 'mz-tab-item',
  templateUrl: './tab-item.component.html',
  styleUrls: ['./tab-item.component.scss'],
})
export class TabItemComponent extends HandlePropChanges {
  @Input() active: boolean;
  @Input() disabled: boolean;
  @Input() href: string;
  @Input() label;
  @Input() target: string;

  tabs: HTMLElement;
  liElement: HTMLElement;

  get link(): string {
    return this.label.replace(/\s+/g, '-').toLowerCase();
  }

  constructor(private renderer: Renderer) {
    super();
  }

  handleActive() {
    this.renderer.setElementClass(this.liElement.querySelector('a'), 'active', this.active);
  }

  handleDisabled() {
    this.renderer.setElementClass(this.liElement, 'disabled', this.disabled);
  }

  handleHref() {
    this.renderer.setElementAttribute(this.liElement.querySelector('a'), 'href', this.href);
  }

  handleLabel() {
    this.renderer.invokeElementMethod(this.liElement.querySelector('a'), 'text', [this.label]);
  }

  handleTarget() {
    this.renderer.setElementAttribute(this.liElement.querySelector('a'), 'target', this.target);
  }

  handleProperties() {
    super.executePropHandlers();
  }

  initHandlers() {
    this.handlers = {
      active: () => this.handleActive(),
      disabled: () => this.handleDisabled(),
      href: () => this.handleHref(),
      label: () => this.handleLabel(),
      target: () => this.handleTarget(),
    };
  }
}
