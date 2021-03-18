export interface Poker {
  id: Number
  name: String
  value: Number
  type: Number
}

export interface Cards {
  type: Number
  value: Number
  length: Number
  data: Poker[]
}

export interface StoreState {}

export interface HomeState {
  title: String
  option: Poker[]
  target: Number
}
