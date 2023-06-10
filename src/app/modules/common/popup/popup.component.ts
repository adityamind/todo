import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ModalType } from '../../../constants/constants';
@Component({
  // moduleId: module.id,
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupComponent implements OnInit {
  @Input() header: string = '';
  @Input() minHeight: string = '';
  @Input() minWidth: string = '';
  @Input() modalType: string = ModalType.LARGE;
  @Input() showCross: boolean = false;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  onCloseClick(e: any) {
    this.onClose.emit(true);
  }
}
