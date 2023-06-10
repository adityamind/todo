import { Component, ElementRef, EventEmitter, Injectable, OnInit, Output, ViewChild } from '@angular/core';
import { CdkDragDrop, CdkDragEnter, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ModalType} from '../../../../constants/constants';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-card-drawer',
  templateUrl: './card-drawer.component.html',
  styleUrls: ['./card-drawer.component.scss']
})
@Injectable()
export class CardDrawerComponent implements OnInit {
  modalType = ModalType;
  @Output() hide: EventEmitter<null> = new EventEmitter<null>();
  weeks: any = [];
  connectedTo: any = [];
  isValid: Boolean = false;
  showPopup: Boolean = false;
  showDetailPage: Boolean = false;
  isReadOnly: Boolean = true;
  showEditDeleteOption:any=[];
  isEditable:any=[];
  cardNameEdited:string='';
  taskNameHeader:string="";
  taskDetails:string="";
  updatedTaskId:any;
  updatedParentId:any;
  isButtonEnable:Boolean=true;
  previewImageUrl:string="";
  scrollInterval:any;

  constructor(private fb: FormBuilder,public drawerService:DataService,private elementRef: ElementRef) {

  }

  addTaskForm!: FormGroup;
  createNew !:FormGroup;
  user:any={
    first_name:'',
    last_name:'',
    email:'',
    mobile:'',
    image:'',
  };
  cardList:any=[];
  docId:string = '';
  ngOnInit(): void {
    this.user.email=this.drawerService.getEmail();
    this.addTaskForm = this.fb.group({
      cardTitleName: ['', Validators.required],
      cardId: ['', Validators.required]
    })
    this.createNew=this.fb.group({
      title:['',Validators.required]
    })
    this.listCard();
  }


  saveProfile(){
    let body ={
      first_name:this.user.first_name || "",
      last_name:this.user.last_name || "",
      email:this.user.email,
      mobile:this.user.mobile || "",
      data:this.cardList || [],
      other:[{image:this.user.image}],
      id:""
    };
    if(this.docId) {
      this.drawerService.updateDetails(body,this.docId);
    }
    else {
      this.drawerService.addCard(body);
    }
      this.listCard();
  }


    
  handleImageUpload(event: any) {
    const file = event.target.files[0];
    const input = event.target as HTMLInputElement;

  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
    this.drawerService.showLoader(true);
    if (file) {
    const {task,filePath} = this.drawerService.uploadImage(file);
    task.subscribe((res:any)=>{
      this.drawerService.getImageUrl(filePath).subscribe(url=>{
        this.user.image=url;
      })
      this.drawerService.showLoader(false);

     },(err)=>{
    this.drawerService.showLoader(false);
      alert('Image uploading error');
     })
    }
    
  }

  openFile(): void {
    document.getElementById('image-input')?.click();
  }




  get title(): FormControl {
    return this.createNew.get('title') as FormControl;
  }

  openEditDeleteOption(i:number,j:number){
    // this.showEditDeleteOption.forEach((data:any)=>{
    //     data.fill(0);
    //   })
    this.showEditDeleteOption[i][j] = !this.showEditDeleteOption[i][j];
  }

  openEditDeletePopup(i:number,j:number){
    this.showEditDeleteOption[i][j] = 1;
  }

  closeEditDeletePopup(event:any){
    const element = event.target as HTMLElement;
    if(!element.classList?.contains('mat-icon')) {
    this.showEditDeleteOption.forEach((data:any)=>{
      data.fill(0);
    })
  }
  else {
    this.showEditDeleteOption.forEach((data:any)=>{
      data.forEach((btn:any)=>{
        if(btn==1){
          console.log('click')
        }
      });
    })
  }
  }

  openDetails(id:any,parentId:any){
    this.cardList.forEach((card:any)=>{
      if(card.id==parentId) {
        card.list.forEach((data:any)=>{
          if(data.selfId==id) {
            this.taskNameHeader = data.name;
            this.taskDetails = data.detail || "no deatils to show";
          }
        })
      }
    })
    this.updatedTaskId = id;
    this.updatedParentId = parentId;
    this.showDetailPage = true;

  }

  hideDetails() {
    this.showDetailPage = false;
  }



  addNew() {
    let name = this.title.value;
    let val = {
      id: 'card'+ new Date().getTime(),
      name: name,
      list: [],
      isDeleted:0
    }
    let data = [];
    if(this.cardList.length){
    this.cardList.forEach((card:any)=>{
      data.push(card)
    });
  }
  data.push(val);
    let body ={
      first_name: this.user.first_name || "",
      last_name: this.user.last_name || "",
      email:this.user.email,
      mobile:this.user.mobile || "",
      data:data,
      other:this.user.image ? [{image:this.user.image}] :[],
      id:""
    };
    if(!this.cardList.length){
    this.drawerService.addCard(body);
    }
    else{
      this.drawerService.updateDetails(body,this.docId);
    }
    this.listCard();
  }
listCard(){
  if (localStorage.getItem('todo') != null) {
    let email=this.user.email;
    this.isValid = true;
    this.drawerService.showLoader(true);
    this.drawerService.getCardDeatils(email).subscribe((res:any)=>{
    this.drawerService.showLoader(false);
    let response= res[0]?.payload.doc.data();
    this.docId=res[0]?.payload.doc.id;
    if(response?.data?.length) {
      this.user.first_name = response.first_name;
      this.user.last_name = response.last_name;
      this.user.mobile = response.mobile;
      this.user.image = response.other?.length ? response.other[0].image : "";
      this.isEditable = new Array(response.data.length);
      this.isEditable.fill(0);
      response.data.forEach((result:any)=>{
        let arr = new Array(result.list.length);
        arr.fill(false);
        this.showEditDeleteOption.push(arr);
      })
      this.cardList.length = 0;
       response.data.map((card:any)=>{
        this.cardList.push(card);
       });
      }
      this.weeks = response?.data;
      if(this.weeks) {
      for (let week of this.weeks) {
        this.connectedTo.push(week.id);
      }
    }
    },err=>{
    this.drawerService.showLoader(false);
    alert('error to fetching details');
    });
    
  }
  else {
    this.drawerService.showLoader(false);
    alert('something went wrong');
  }
}
/** Clamps a number between zero and a maximum. */
clamp(value: any, max: any) {
  return Math.max(0, Math.min(max, value));
}

moveItemInArray(array: any, fromIndex: any, toIndex: any) {
  const from = this.clamp(fromIndex, array.length - 1);
  const to = this.clamp(toIndex, array.length - 1);
  if (from === to) {
    return;
  }
  const target = array[from];
  const delta = to < from ? -1 : 1;
  for (let i = from; i !== to; i += delta) {
    array[i] = array[i + delta];
  }
  array[to] = target;
}

copyArrayItem(currentArray: any, targetArray: any, currentIndex: any, targetIndex: any) {
  const to = this.clamp(targetIndex, targetArray.length);
  if (currentArray.length) {
    targetArray.splice(to, 0, currentArray[currentIndex]);
  }
}

transferArrayItem(currentArray: any, targetArray: any, currentIndex: any, targetIndex: any) {
  const from = this.clamp(currentIndex, currentArray.length - 1);
  const to = this.clamp(targetIndex, targetArray.length);
  if (currentArray.length) {
    targetArray.splice(to, 0, currentArray.splice(from, 1)[0]);
  }
}

drop(event: CdkDragDrop<string[]>) {
  this.drawerService.showLoader(true);
  let nextId = event.container.id;
  let currentId = event.previousContainer.id;
  let currentArr = [], nextArr = [];
  for (let week of this.weeks) {
    if (week.id === currentId) currentArr = week.list;
    if (week.id === nextId) nextArr = week.list;
  }
  if (event.previousContainer === event.container) {
    moveItemInArray(nextArr, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(
      currentArr,
      nextArr,
      event.previousIndex,
      event.currentIndex,
    );
  }
  for (let week of this.weeks) {
    if (week.id === currentId) week.weekList = currentArr;
    if (week.id === nextId) week.weekList = nextArr;
  }
  let body ={
    first_name:this.user.first_name ? this.user.first_name : "",
    last_name:this.user.last_name ? this.user.last_name : "",
    email:this.user.email,
    mobile:this.user.mobile?this.user.mobile:"",
    data:this.weeks,
    other:this.user.image ? [{image:this.user.image}] :[],
    id:""
  };
  this.drawerService.updateDetails(body,this.docId);
  this.drawerService.showLoader(true);
  this.listCard();
}


get cardTitleName():FormControl{
  return this.addTaskForm.get('cardTitleName') as FormControl;
}

get cardId():FormControl{
  return this.addTaskForm.get('cardId') as FormControl;
}



addNewTask(id: any){
  this.addTaskForm.controls['cardId'].setValue(id);
  this.showPopup=true;
}

deleteList(id: any){
  let confirm = prompt("To Delete the List Plese type 'yes'");
  if(confirm!=='yes') {
    return;
  }
    let data:any = [];
    if(this.cardList.length){
    this.cardList.forEach((card:any)=>{
      if(card.id!==id) {
        data.push(card)
      }
      else{
        data.push({
          id: card.id,
          name: card.name,
          list: card.list,
          isDeleted:1

        });
      }
    });
  }
    let body ={
      first_name:this.user.first_name ? this.user.first_name : "",
      last_name:this.user.last_name ? this.user.last_name : "",
      email:this.user.email,
      mobile:this.user.mobile?this.user.mobile:"",
      data:data,
      other:this.user.image ? [{image:this.user.image}] :[],
      id:""

    };
      this.drawerService.updateDetails(body,this.docId);
  this.listCard();
}

enableEdit(id:number,listId:any) {
  if(this.isEditable[id]==0) {
    this.isEditable[id]=1;
  } 
  else if(this.isEditable[id]==1) {
    this.isEditable[id]=0;
    let val=`Value: ${'card'+id}`
    console.log(val);
    // this.editList(listId,val);
  }
}
editList(id: any,val:any){
  
  let data:any = [];
  if(this.cardList.length){
  this.cardList.forEach((card:any)=>{
    if(card.id!==id) {
      data.push(card)
    }
    else{
      data.push({
      id: card.id,
      name: val,
      list: card.list,
      isDeleted:card.isDeleted
      })
    }
  });
}
  let body ={
    first_name:this.user.first_name ? this.user.first_name : "",
    last_name:this.user.last_name ? this.user.last_name : "",
    email:this.user.email,
    mobile:this.user.mobile?this.user.mobile:"",
    data:data,
    other:this.user.image ? [{image:this.user.image}] :[],
    id:""

  };
    this.drawerService.updateDetails(body,this.docId);
this.listCard();
}

hideModal(){
  this.hide.emit();
  this.showPopup=false;
}
hideUpdate(){
  this.drawerService.showUpdate(false);
}



addTaskNow(){
  let val = this.cardTitleName.value;
  let id=this.cardId.value;
  let data:any = [];
  if(this.cardList.length){
  this.cardList.forEach((card:any)=>{
    if(card.id!=id) {
    data.push(card)
    }
    else{
      let newData:any=[];
      if(card.list.length){
      card.list.forEach((data:any)=>{
        newData.push(data);
      })
      };
      newData.push({
        name:val.trim().length>0 ? val : 'unnamed',
        detail:"",
        other:[],
        selfId:'item'+new Date().getTime(),
        isDeleted:0
      })
      data.push({
        id:card.id,
        name:card.name,
        list:newData,
        isDeleted:card.isDeleted
      })
    }
  });
}
  let body ={
    first_name:this.user.first_name ? this.user.first_name : "",
    last_name:this.user.last_name ? this.user.last_name : "",
    email:this.user.email,
    mobile:this.user.mobile?this.user.mobile:"",
    data:data,
    other:this.user.image ? [{image:this.user.image}] :[],
    id:""
  };
    this.drawerService.updateDetails(body,this.docId);
 
  this.listCard();
  this.showPopup=false;
}

updateTask(taskId:any,id:any,isDeleted?:number){
  this.drawerService.showLoader(true);
  this.isButtonEnable = false;
  setTimeout(()=>{
    this.isButtonEnable = true;
    this.isReadOnly = true;
  },2000);
  let newDetail= this.taskDetails || "";
  let data:any = [];

  this.cardList.forEach((card:any)=>{
    if(card.id!=id) {
    data.push(card)
    }
    else{
      let newData:any=[];
      card.list.forEach((data:any)=>{
        if(data.selfId!=taskId) {
          newData.push(data);
        }
        else{
          if(isDeleted===1) {
            newData.push({
              name:data.name,
              detail:data.detail,
              other:data.other,
              selfId:data.selfId,
              isDeleted:1
            })
          }
          else{
            newData.push({
              name:data.name,
              detail:newDetail,
              other:data.other,
              selfId:data.selfId,
              isDeleted:data.isDeleted
            })
          }
        }
      })
      data.push({
        id:card.id,
        name:card.name,
        list:newData,
        isDeleted:card.isDeleted
      })
    }
  });
  let body ={
    first_name:this.user.first_name ? this.user.first_name : "",
    last_name:this.user.last_name ? this.user.last_name : "",
    email:this.user.email,
    mobile:this.user.mobile?this.user.mobile:"",
    data:data,
    other:this.user.image ? [{image:this.user.image}] :[],
    id:""
  };
    this.drawerService.updateDetails(body,this.docId);
 
  this.listCard();
  this.drawerService.showLoader(false);

}

enableRead() {
  this.isReadOnly = false;
}

}


