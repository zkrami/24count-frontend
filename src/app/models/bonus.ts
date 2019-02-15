export class Bonus {
  bonus:number  = 0 ;
  bonus_each:number = 0 ;

  get real(){
    if(!this.bonus_each) return 0 ;
    return this.bonus / this.bonus_each ;
  }
}
