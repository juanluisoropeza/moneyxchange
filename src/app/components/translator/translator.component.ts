import { Component, OnInit } from '@angular/core';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.scss']
})

export class TranslatorComponent implements OnInit {

  public valorUsd:number = 0;

  public form: FormGroup;

  public euroTs: number;

  private ds: string = ".";
  private ts: string = ",";
  private pd = "000000";

  constructor(
    private dataApi:CotizacionService,
    private fb:FormBuilder) {

      this.form = this.fb.group ({
        euro: '',
        usd: [{value: '', disabled: true}]
      })

  }

  ngOnInit() {
    this.getCotizacion();
  }

  getCotizacion() {
    this.dataApi.getCotizacion()
    .subscribe(data => {
      this.valorUsd = data["rates"].USD
    });
  }

  public validateForm(euro) {
    //console.log(euro);
    let resultado = this.valorUsd * this.form.controls.euro.value;
    this.form.patchValue({
      usd: this.transform(resultado, 2),
    })
    //this.form.controls.usd.setValue[resultado];
    console.log(this.transform(resultado, 2));
    //console.log(this.valorUsd);
  }

  public transform(value: number | string, fractionSize: number = 2): string {
    let [ integer, fraction = "" ] = (value || "").toString()
      .split(this.ds);

    fraction = fractionSize > 0
      ? this.ds + (fraction + this.pd).substring(0, fractionSize)
      : "";

    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.ts);

    return integer + fraction;
  }

}
