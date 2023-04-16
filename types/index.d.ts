import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import type { StackScreenProps } from "@react-navigation/stack";

// ========== COMPONENT PROPS ==========
export interface ProductFlatListProps {
  products: Product[];
  onEndReached?: () => void;
  handleGoToDetail: () => void;
  isLoading: boolean;
}

export type RootBottomTabParamList = {
  Home: undefined;
  Cart: undefined;
  Account: undefined;
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

export type AccountProps = BottomTabBarProps<RootBottomTabParamList, 'Account'>
export type ProductListProps = StackScreenProps<ProductListStackParamList, 'List'>
export type ShoppingListProps = StackScreenProps<ShoppingListStackParamList, 'List'>
export type UnauthenticatedProps = StackScreenProps<AuthenticateStackParamList, 'Unauthenticated'>
export type LoginProps = StackScreenProps<AuthenticateStackParamList, 'Login'>
export type SignupProps = StackScreenProps<AuthenticateStackParamList, 'Signup'>

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
  done: boolean;
}

export interface Product {
  id: string;
  data: ProductData;
}

export interface User {
  uid: string;
  email: string | null;
}

