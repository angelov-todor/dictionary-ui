import { Directive, ElementRef, Input, OnInit, HostBinding, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appProcessing]'
})
export class ProcessingDirective implements OnInit {

  @Input()
  @HostBinding('class.processing')
  appProcessing = false;

  @Input()
  @HostBinding('disabled')
  get appProcessingDisable() {
    return this._appProcessingDisabled && this.appProcessing;
  }

  set appProcessingDisable(value) {
    this._appProcessingDisabled = !!value;
  }

  private _appProcessingDisabled = true;

  spinner: HTMLElement;

  constructor(private el: ElementRef,
              private renderer: Renderer2) {
  }

  ngOnInit() {
    this.spinner = this.renderer.createElement('span');
    this.renderer.setAttribute(this.spinner, 'class', 'app-processing-spinner fa fa-refresh fa-spin');
    this.renderer.insertBefore(this.el.nativeElement, this.spinner, this.el.nativeElement.firstChild);
  }
}
