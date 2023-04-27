import { register } from '@antv/x6-angular-shape';
import { Directive, Injector, Input, OnInit, TemplateRef } from '@angular/core';

export interface ShapeDefinitionConf {
  shape: string;
}

@Directive({
  selector: 'ng-template[appShapeDefinition]',
})
export class ShapeDefinitionDirective implements OnInit {
  constructor(
    private readonly tpl: TemplateRef<any>,
    private readonly injector: Injector
  ) {}

  @Input('appShapeDefinition') conf!: ShapeDefinitionConf;
  ngOnInit(): void {
    register({ injector: this.injector, ...this.conf, content: this.tpl });
  }
}
