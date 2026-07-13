# Calculator IPA — Screens & Navigation

## How to run
cd /home/hewlett/projects/frontendX_backend_merged/frontend_runs/run_96382d51_20260713_110917/project
npm install && npx expo start
# Press 'a' for Android, 'i' for iOS simulator, 'w' for web,
# or scan the QR code with the Expo Go app on a physical iOS/Android device.

## Screens
| Screen | File | Description |
|--------|------|-------------|
| Discover | src/screens/DiscoverScreen.tsx | Featured collections, search, categories, and trending products with wishlist toggles. |
| Product Details | src/screens/ProductDetailsScreen.tsx | Gallery, pricing, variants, specs, reviews, related products, add to cart/save actions. |
| Shopping Cart | src/screens/CartScreen.tsx | Cart line items, quantity controls, totals, and checkout simulation. |
| Wishlist | src/screens/WishlistScreen.tsx | Saved products with search, remove, and move-to-cart actions. |
| Orders | src/screens/OrdersScreen.tsx | Order history with delivery status, payment summary, and buy again. |
| Profile | src/screens/ProfileScreen.tsx | Customer info, saved addresses, appearance, notifications, privacy, and about settings. |
| Not Found | src/screens/NotFoundScreen.tsx | Fallback screen when a route is missing. |

## Navigation map
- Discover -> Product Details (tap a product card)
- Wishlist -> Product Details (tap a saved product card)
- Product Details -> Product Details (tap a related item)
- Not Found -> previous screen (tap Go Back)

## Shared components
- src/components/HeaderBar.tsx — Large title header with optional action icon.
- src/components/SearchBar.tsx — Search input with clear action and icon.
- src/components/CategoryPill.tsx — Category filter chip.
- src/components/ProductCard.tsx — Product card with image placeholder and wishlist action.
- src/components/QuantityStepper.tsx — Increment/decrement control for cart quantities.
- src/components/PriceRow.tsx — Summary row for price breakdown.
- src/components/SectionHeader.tsx — Section header with optional action link.
- src/components/OptionChip.tsx — Selectable chip for sizes/appearance settings.
- src/components/SettingRow.tsx — Profile settings row with icon and chevron.
- src/components/ToggleRow.tsx — Toggle-style row for notifications/privacy.

## Design tokens
primary, primaryDark, primaryLight, accent, background, surface, card, border, textPrimary, textSecondary, textDisabled, textInverse, success, warning, error, info, shadowColor
