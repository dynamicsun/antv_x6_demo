import { register } from '@antv/x6-angular-shape';
import { PortManager } from '@antv/x6/lib/model/port';
import { Directive, Injector, Input, OnInit, TemplateRef } from '@angular/core';

export interface ShapeDefinitionConf {
  shape: string;
  width: number;
  height: number;
  ports?: PortManager.PortMetadata[] | PortManager.Metadata;
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
