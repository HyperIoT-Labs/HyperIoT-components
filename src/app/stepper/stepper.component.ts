import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  seventhFormGroup: FormGroup;

  firstCompleted = false;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.firstFormGroup = this.fb.group({

    });
    this.secondFormGroup = this.fb.group({

    });
    this.thirdFormGroup = this.fb.group({

    });
    this.fourthFormGroup = this.fb.group({

    });
    this.fifthFormGroup = this.fb.group({

    });
    this.sixthFormGroup = this.fb.group({

    });
    this.seventhFormGroup = this.fb.group({

    });
  }

  completeFirst() {
    this.firstCompleted = !this.firstCompleted;
  }
}
