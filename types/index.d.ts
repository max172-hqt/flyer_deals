import type { StackScreenProps } from "@react-navigation/stack";

// ========== COMPONENT PROPS ==========
export interface ProductFlatListProps {
  products: Product[];
  onEndReached?: () => void;
  handleGoToDetail: () => void;
  isLoading: boolean;
}

export type ProductListStackParamList = {
  List: undefined;
  Details: undefined;
};

export type ShoppingListStackParamList = {
  List: undefined;
  Details: undefined;
}

export type AuthenticateStackParamList = {
  Unauthenticated: undefined;
  Login: undefined;
  Signup: undefined;
};

export type ProductListProps = StackScreenProps<ProductListStackParamList, 'List'>
export type ShoppingListProps = StackScreenProps<ShoppingListStackParamList, 'List'>
export type UnauthenticatedProps = StackScreenProps<AuthenticateStackParamList, 'Unauthenticated'>

// ========== ENTITIES ==========
export interface ProductData {
  name: string;
  salePrice: string | null;
  regularPrice: string | null;
  imageUrl: string;
  description: string;
  tags: string[];
}

export interface Product {
  id: string;
  data: ProductData;
}

export interface CartItem extends Product {
  firebaseRefId: string;
}

export interface Product {
  id: string;
  data: ProductData;
}

export interface User {
  uid: string;
  email: string | null;
}

