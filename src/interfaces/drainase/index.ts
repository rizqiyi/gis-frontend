export interface IDrainaseImages {
  id: number
  image_path: string
  image_name: string
  image_id: string
  drainase_id: number
  createdAt: string
  updatedAt: string
}

export interface IDrainaseData {
  id: number
  latitude: number
  longitude: number
  district: string
  sub_district: string
  street_name: string
  street_width: string
  left_typical: string
  left_drainase_depth: string
  left_drainase_width: string
  left_drainase_condition: string
  right_typical: string
  right_drainase_depth: string
  right_drainase_width: string
  right_drainase_condition: string
  note: string
  sta: string
  street_path: string
  description: string
  is_published: boolean
  user_id: number
  createdAt: string
  updatedAt: string
  images: IDrainaseImages[]
}

export interface IDrainase {
  previous_page: null | number
  current_page: number
  next_page: null | number
  total: number
  per_page: number
  data: IDrainaseData[]
  offset: number
  limit: number
}

export interface IDrainaseForm {
  street_name: string
  district: string
  sub_district: string
  street_width: string
  sta: string
  latitude: string
  longitude: string
  left_typical: string
  left_drainase_depth: string
  left_drainase_width: string
  left_drainase_condition: string
  right_typical: string
  right_drainase_depth: string
  right_drainase_width: string
  right_drainase_condition: string
  note: string
  user_id: number
  description: string
  is_published: boolean
}
