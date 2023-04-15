// ========== COMPONENT PROPS ==========
export interface ProductFlatListProps {
  products: Product[];
  onEndReached?: () => void;
  handleGoToDetail: () => void;
  isLoading: boolean;
}

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

