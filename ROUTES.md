# Test Android Busines Logic Upload — Screens & Navigation

## How to run
cd /home/hewlett/projects/frontendX_backend_merged/frontend_runs/run_b9b87d6f_20260713_044517/project
npm install && npx expo start
# Press 'a' for Android, 'i' for iOS simulator, 'w' for web,
# or scan the QR code with the Expo Go app on a physical iOS/Android device.

## Screens
| Screen | File | Description |
|--------|------|-------------|
| Home | src/screens/HomeScreen.tsx | Premium SaaS hero, CTA, and collaboration cards. |
| Features | src/screens/FeaturesScreen.tsx | Feature list with navigation to detail. |
| FeatureDetail | src/screens/FeatureDetailScreen.tsx | Feature details with metrics summary. |
| Testimonials | src/screens/TestimonialsScreen.tsx | Swipeable testimonial carousel with pagination. |
| Pricing | src/screens/PricingScreen.tsx | Plan comparison with highlighted professional plan. |
| Resources | src/screens/ResourcesScreen.tsx | Resource list with categories and summaries. |
| ResourceDetail | src/screens/ResourceDetailScreen.tsx | Resource detail and key takeaway. |
| Company | src/screens/CompanyScreen.tsx | Company overview and values. |
| Contact | src/screens/ContactScreen.tsx | Contact form with validation and success state. |
| Login | src/screens/LoginScreen.tsx | Email/password login with Google option. |
| NotFound | src/screens/NotFoundScreen.tsx | Fallback screen. |

## Navigation map
- Home -> Pricing (tap "Get Started Free")
- Home -> Features (tap any collaboration card)
- Drawer menu -> Features / Pricing / Testimonials / Resources / Company / Contact / Login (tap drawer item)
- Features -> FeatureDetail (tap a feature card)
- Resources -> ResourceDetail (tap a resource card)
- Pricing -> Contact (tap any plan CTA)
- Login -> Contact (tap "Forgot Password?")

## Shared components
- src/components/HeaderBar.tsx — sticky header with centered logo and menu button.
- src/components/PrimaryButton.tsx — animated CTA button with scaling press state.
- src/components/InputField.tsx — labeled text input with validation state.
- src/components/FeatureCard.tsx — feature list card with icon and description.
- src/components/TestimonialCard.tsx — testimonial card with avatar and stars.
- src/components/SectionHeader.tsx — section title + subtitle block.
- src/components/DrawerItemRow.tsx — drawer navigation row.
- src/components/CollaborationCard.tsx — horizontal scroll collaboration card.

## Design tokens
primary, primaryDark, primaryLight, accent, background, surface, card, border, textPrimary, textSecondary, textDisabled, textInverse, success, warning, error, info, shadowColor
