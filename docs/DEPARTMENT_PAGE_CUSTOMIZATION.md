# Department Page Customization Guide

Each department has its own page file:

- `src/Pages/departments/CE.tsx`
- `src/Pages/departments/CPE.tsx`
- `src/Pages/departments/ECE.tsx`
- `src/Pages/departments/EE.tsx`
- `src/Pages/departments/IE.tsx`
- `src/Pages/departments/MFE.tsx`
- `src/Pages/departments/ME.tsx`
- `src/Pages/departments/MEE.tsx`

## Add a Custom Section

Inside your department TSX file, add an `extraSections` block and pass it to `DepartmentTemplate`.

Example (`CE.tsx`):

```tsx
import DepartmentTemplate from "./DepartmentTemplate";

export default function CEPage() {
  const extraSections = (
    <section id="ce-custom" className="max-w-6xl mx-auto px-6 pt-16">
      <h2 className="text-2xl font-bold">CE Custom Section</h2>
      <p className="mt-2 text-sm text-gray-600">Your section content here.</p>
    </section>
  );

  return <DepartmentTemplate code="CE" extraSections={extraSections} />;
}
```

## Keep Scope Clean

- Edit only your own department TSX file.
- Edit only your own JSON file in `public/data/departments/<CODE>.json`.
- Do not modify shared template files unless maintainer approves.
