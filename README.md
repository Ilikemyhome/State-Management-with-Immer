# State-Management-with-Immer

A React component demonstrating complex state management using the useImmer hook from the Immer library. This project simplifies nested state updates by allowing direct mutation of a draft state while maintaining immutability under the hood.

## Overview
This component manages a shopping list where each item contains nested data:

id — unique identifier

name — string

quantity — number

details — nested object containing:

category

notes

The useImmer hook enables intuitive updates to deeply nested fields without manual object spreading.

## Features
Add new shopping list items

Update item fields (name, quantity, category, notes)

Remove items

Real‑time UI updates

Fully immutable state managed by Immer

##  Test Cases
Below are 3 normal cases and 3 edge cases, formatted for a README and ready for instructor review.

### Normal Test Cases
        1. Add a standard item
        
        Action: Click Add Item

        Expected Result:

        New item appears in the list

        All fields display correctly

        2. Update an existing item’s quantity
        Input: Change quantity from 1 to 3

        Action: Edit quantity input

        Expected Result:

        UI updates immediately

        State reflects new quantity

        3. Remove an item
        Input: Click Remove on any item

        Expected Result:

        Item disappears from the list

        No errors thrown

## Edge Test Cases
    1. Add item with empty name

    Expected Result:

    Item is not added

    Component remains stable

    2. Update nested field (details.notes)
   
    Action: Edit notes input

    Expected Result:

    Only details.notes updates

    No other fields mutate

    No manual spreading required

    3. Remove item that no longer exists
    Input: Attempt to remove an item whose ID is missing (e.g., rapid double-click)

    Expected Result:

    No crash

    No state corruption

    Draft safely ignores missing ID