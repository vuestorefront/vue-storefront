// {
//                    "display_id": 5136884,
//                    "estimated_shipment_date": "2025-03-10 12:28:48",
//                    "is_cancelled": false,
//                    "product": {
//                        "id": 725,
//                        "sku": "petsiesCustomPrintedSocks_bundle",
//                        "name": "Custom Pet Socks",
//                        "image": "/b/o/bowtie-cheshire.jpg",
//                        "small_image": "/b/o/bowtie-cheshire.jpg",
//                        "thumbnail": "/b/o/bowtie-cheshire.jpg",
//                    },
//                    "progress_tracker": {
//                        "status_id": 4,
//                        "status_list": [
//                            {
//                                "status_id": 4,
//                                "status_name": "Review",
//                            },
//                            {
//                                "status_id": 2,
//                                "status_name": "In Production",
//                            }
//                        ]
//                    },
//                    "available_actions": [
//                        {
//                            "code": "feedback_required",
//                            "name": "Review Your Plushie",
//                            "message": "We’re waiting to hear from you. Please check your email!",
//                            "is_blocking_progress": true,
//                            "url": null
//                        }
//                    ],
//                    "shipments": [
//                        {
//                            "carrier_code": "USPS",
//                            "tracking_number": "123123123",
//                            "quantity": 1
//                        }
//                    ],
//                    "extension_attributes": {
//                        "customizations": [ similar to Elasticsearch structure],
//                        "customization_states": [
//                            {
//                                "customization_id": "1dfb51f6-4280-4830-ba18-6f2a60412094",
//                                "value": "f35873f8-eaa8-459d-bcbb-739eb0de7251"
//                            },
//                            {
//                                "customization_id": "4eff2861-3031-4c91-91cf-81fec18536d8",
//                                "value": {
//                                    "id": "c3665600-ce63-467d-ac80-73a344690e63",
//                                    "url": "budsies-staging-artworks/c3665600-ce63-467d-ac80-73a344690e63.jpg"
//                                }
//                            }
//                        ],
//                    }
//                }

import { OrderItemAvailableAction } from './order-item-available-action';
import { OrderItemShipment } from './order-item-shipment';
import { OrderItemExtensionAttributes } from './order-item-extension-attributes';
import { ProgressTrackerData } from './progress-tracker-data';

export interface OrderItem {
  display_id: number,
  estimated_shipment_date: string,
  shipped_date: string,
  product: {
    id: number,
    sku: string,
    name: string,
    image: string,
    small_image: string,
    thumbnail: string
  },
  progress_tracker: ProgressTrackerData,
  available_actions: OrderItemAvailableAction[],
  shipments: OrderItemShipment[],
  extension_attributes: OrderItemExtensionAttributes
}
