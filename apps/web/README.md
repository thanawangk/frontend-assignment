# Storefront

A clothing storefront built from the SHOP.CO design, running against the Elysia
API in `packages/backend`.

---

## Tech stack

Next.js, React, Tailwind CSS, and TypeScript came with the starter. The
following were added:

| Library            | Used for                | Reason                                                                                                                |
| ------------------ | ----------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **TanStack Query** | Everything from the API | Caching, infinite scroll, and request de-duplication.                                                                 |
| **Zustand**        | What the shopper chose  | Filters and search are shared by the sidebar, the mobile drawer, and the header                                       |
| **lucide-react**   | Icons                   | Matches the design's icon style.                                                                                      |

**No component library.** Three primitives cover it — `Button`, `Typography`, `Spinner` —
and the colours and type scale live as Tailwind theme tokens, so
`text-heading-2` and `bg-danger-surface` mean the same thing in every file.

### The line between the two state tools

Every other decision follows from this split.

- **Server state → TanStack Query.** Products, colours, sizes, the cart.
- **Client state → Zustand.** Which filters are applied, what was searched.

---

## Structure

```text
app/                     routes; server components unless they need state
components/
  layout/                header, promotion banner, page container
  ui/                    Button · Typography · Spinner
features/
  products/              api · components (+ filters) · hooks · types
  cart/                  api · components · hooks · types
lib/                     cn · eden · formatPrice · i18n · hooks
locales/en.json          message catalogue
stores/productStore.ts   applied filters + search keyword
```