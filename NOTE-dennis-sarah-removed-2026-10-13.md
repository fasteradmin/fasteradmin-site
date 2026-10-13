# Note: Dennis & Sarah temporarily removed from team grid — 2026-10-13 16:44

## What was removed

From the "Jouw team van experts" / "Your Team of Experts" grid on:
- `app/(nl)/about/page.jsx`
- `app/(en)/eng/about/page.jsx`

Original `team` array (identical in both files):

```js
const team = [
  { name: "Joey Tan", role: "Oprichter" /* "Founder" in EN */, img: "cikrWotQJls4kqizrkcGapqI25k.png" },
  { name: "Sarah de Bree", role: "Automations Engineer", img: "Tkeu4Z25LmXvGufjWDp2YIp6PuY.png" },
  { name: "Dennis van der Molen", role: "Automations Engineer", img: "wBiVNcycdYsmtEfv9F6zAl06eF4.png" },
];
```

Grid was `sm:grid-cols-3` with all three rendered.

## What was left untouched

`components/Faq.jsx` still shows Sarah de Bree's photo/name next to the "plan a meeting" link in the FAQ section (lines ~108-120). Left as-is per instruction.

## To restore

Put the `Sarah de Bree` and `Dennis van der Molen` objects back into the `team` array in both files, in their original order.
