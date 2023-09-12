<template>
    <div class="hyyp-inbox">
    <EasyDataTable 
        v-model:items-selected="itemsSelected"
        fixed-checkbox
        table-class-name="customize-table"
    
        :body-row-class-name="bodyRowClassNameFunction"
        :headers="headers"
        :items="items"
        :themeColor="themeColor"
    />
    </div>

  </template>
  
  <script lang="ts" setup>
    import type { Header, Item, BodyRowClassNameFunction } from "vue3-easy-data-table";
    import { ref } from "vue";

    const itemsSelected = ref<Item[]>([]);
    const headers: Header[] = [
            { text: "Sender", value: "sender", width: 200 },
            { text: "Message", value: "message", width: 400},
            { text: "Date", value: "date", width: 200},
    ];

    const items: Item[] = [
        { sender: "Stephen Curry", message: "GSW", date: 30, opened: true},
        { sender: "Lebron James", message: "LAL", date: 6, opened: false},
        { sender: "Kevin Durant", message: "BKN", date: 7, opened: false},
        { sender: "Giannis Antetokounmpo", message: "MIL", date: 11, opened: false},
    ];

    const bodyRowClassNameFunction: BodyRowClassNameFunction = (item: Item, rowNumber: number): string => {
        if (item.opened === true) return 'unread';
        return 'read';
    };
    const themeColor = "#37515f"
  </script>
  
<style lang="scss">
.hyyp-inbox {
    border: 1px solid salmon;
    .customize-table {
    --easy-table-border: #fff;
    --easy-table-row-border: 1px solid #f6f6f6;

    --easy-table-header-font-size: 11px;
    --easy-table-header-font-weight: 400;
    --easy-table-header-text-transform: uppercase;
    --easy-table-header-height: 30px;
    --easy-table-header-font-color: $black;
    --easy-table-header-background-color: inherit;

    --easy-table-header-item-padding: 10px 15px;

    --easy-table-body-even-row-font-color: #100409;

    --easy-table-body-row-font-color: $black;
    --easy-table-body-row-height: 50px;
    --easy-table-body-row-font-size: 14px;

    --easy-table-body-row-hover-background-color:#ffecee;
    
    --easy-table-body-item-padding: 10px 15px;

    --easy-table-footer-background-color: inherit;
    --easy-table-footer-font-color: $black;
    --easy-table-footer-font-size: 14px;
    --easy-table-footer-padding: 0px 10px;
    --easy-table-footer-height: 50px;

    --easy-table-rows-per-page-selector-width: 70px;
    --easy-table-rows-per-page-selector-option-padding: 10px;
    --easy-table-rows-per-page-selector-z-index: 1;


    --easy-table-scrollbar-track-color: #2d3a4f;
    --easy-table-scrollbar-color: #2d3a4f;
    --easy-table-scrollbar-thumb-color: #4c5d7a;;
    --easy-table-scrollbar-corner-color: #2d3a4f;

    --easy-table-loading-mask-background-color: #2d3a4f;
    cursor: pointer;
    }
    td:first-of-type{
        width: 30px !important;
    }
    .unread {
        --easy-table-body-row-background-color: #fff;
    }
    .read {
        --easy-table-body-row-background-color: #f6f6f6;
    }
    .vue3-easy-data-table__footer[data-v-32683533] {
        justify-content: flex-start;
        width: 100%;
    }
    .pagination__items-index {
        order: 1;
        width: 80%;
    }
    .pagination__rows-per-page {
        order: 2;
        text-transform: capitalize;
        font-weight: 500;
        flex-wrap: nowrap;
        min-width: 20%;
    }
    .previous-page__click-button {
        order: 3;
    }
    .next-page__click-button {
        order: 4
    }
    .previous-page__click-button.first-page .arrow[data-v-c9da5286], .next-page__click-button.last-page .arrow[data-v-c9da5286] {
        border-color: #100409
    }
}
</style>