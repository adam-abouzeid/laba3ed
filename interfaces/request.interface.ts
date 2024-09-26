enum Category {
  FOOD,
  CLOTHING,
  SHELTER,
  TRANSPORTATION,
  MEDICINE,
  OTHER,
}
export interface Need {
  id: number;
  title: string;
  description: string;
  category: Category;
  area: string;
  contact: string;
  createdAt: Date;
}
