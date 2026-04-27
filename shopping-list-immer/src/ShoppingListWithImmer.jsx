import { useImmer } from "use-immer";
import { useState } from "react";

export default function ShoppingListWithImmer() {

  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");

  const [shoppingList, updateShoppingList] = useImmer([
    {
      id: crypto.randomUUID(),
      name: "Milk",
      quantity: 1,
      details: { category: "Dairy", notes: "Organic if possible" }
    }
  ]);

  const addItem = () => {
    if (!itemName.trim()) return;

    updateShoppingList(draft => {
      draft.push({
        id: crypto.randomUUID(),
        name: itemName,
        quantity: Number(quantity),
        details: {
          category,
          notes
        }
      });
    });

    setItemName("");
    setQuantity(1);
    setCategory("");
    setNotes("");
  };

  const updateItem = (id, field, value) => {
    updateShoppingList(draft => {
      const item = draft.find(i => i.id === id);
      if (!item) return;

      if (field === "name" || field === "quantity") {
        item[field] = value;
      } else {
        item.details[field] = value;
      }
    });
  };

  const removeItem = id => {
    updateShoppingList(draft => {
      const index = draft.findIndex(i => i.id === id);
      if (index !== -1) draft.splice(index, 1);
    });
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Shopping List</h2>

      <div style={{ marginBottom: "1rem" }}>
        <input
          placeholder="Item name"
          value={itemName}
          onChange={e => setItemName(e.target.value)}
        />
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))}
        />
        <input
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
        <input
          placeholder="Notes"
          value={notes}
          onChange={e => setNotes(e.target.value)}
        />
        <button onClick={addItem}>Add Item</button>
      </div>

      <ul>
        {shoppingList.map(item => (
          <li key={item.id} style={{ marginBottom: "1rem" }}>
            <strong>{item.name}</strong> — {item.quantity}
            <br />
            <em>Category:</em> {item.details.category}
            <br />
            <em>Notes:</em> {item.details.notes}
            <br />

            <div style={{ marginTop: "0.5rem" }}>
              <input
                value={item.name}
                onChange={e => updateItem(item.id, "name", e.target.value)}
              />
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={e =>
                  updateItem(item.id, "quantity", Number(e.target.value))
                }
              />
              <input
                value={item.details.category}
                onChange={e =>
                  updateItem(item.id, "category", e.target.value)
                }
              />
              <input
                value={item.details.notes}
                onChange={e => updateItem(item.id, "notes", e.target.value)}
              />
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
