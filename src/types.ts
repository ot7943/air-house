export interface ProductFeatures {
  brand: string;
  model: string;
  color: string;
  type: string;
  power: string;
  coolingSystem: string;
  classification: string;
  remoteControl: boolean;
  energyEfficiencyRatio: string;
  energyEfficiencyLevel: string;
  coolingCapacity: string;
  dimensions: {
    indoor: {
      width: number;
      height: number;
      depth: number;
    };
    outdoor: {
      width: number;
      height: number;
      depth: number;
    };
    connectionLength: number;
  };
  weight: {
    net: number;
    total: number;
  };
  features: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  image: string;
  available: boolean;
  capacity: string;
  condition: string;
  delivery: string;
  warranty: string;
  features: ProductFeatures;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CustomerInfo {
  fullName: string;
  phone: string;
  preferredCallTime: string;
}