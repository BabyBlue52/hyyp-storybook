<template>
    <div class="action-tray">
        <button class="icon-btn">
            <v-icon icon="mdi-refresh" />
        </button>
        <button class="icon-btn">
            <v-icon icon="mdi-trash-can-outline" />
            <span>Delete</span>
        </button>
        <button class="icon-btn">
        <v-icon icon="mdi-information-outline"/>
            <span>Report Spam</span>
        </button>
    </div>
    <div class="hyyp-inbox">
    <EasyDataTable 
        v-model:items-selected="itemsSelected"
        fixed-checkbox
        table-class-name="customize-table"
    
        :body-row-class-name="bodyRowClassNameFunction"
        :headers="headers"
        :items="items"
        :themeColor="themeColor"
        @clickRow="toggleRead"
        
        :sort-by="sortBy"
        :sort-type="sortType"

    >
        <template #empty-message>
        <a href="https://google.com">nothing here</a>
        </template>
    </EasyDataTable>
    </div>

  </template>
  
  <script lang="ts" setup>
    import type { Header, Item, BodyRowClassNameFunction, SortType } from "vue3-easy-data-table";
    import { ref } from "vue";

    const sortBy = ""
    const sortType: SortType = "desc"

    const itemsSelected = ref<Item[]>([]);
    const headers: Header[] = [
            { text: "Sender", value: "sender", sortable: true, width: 200 },
            { text: "Message", value: "message", width: 400},
            { text: "Date", value: "date", sortable: true, width: 200},
    ];

    const items: Item[] = [
        { sender: "Stephen Curry", message: "GSW", date: 30, opened: true},
        { sender: "Lebron James", message: "LAL", date: 26, opened: false},
        { sender: "Kevin Durant", message: "BKN", date: 7, opened: true},
        { sender: "Giannis Antetokounmpo", message: "MIL", date: 11, opened: false},
        { sender: "Stephen Curry", message: "GSW", date: 34, opened: true},
        { sender: "Lebron James", message: "LAL", date: 16, opened: false},
        { sender: "Kevin Durant", message: "BKN", date: 8, opened: true},
        { sender: "Giannis Antetokounmpo", message: "MIL", date: 13, opened: false},
    ];

    const bodyRowClassNameFunction: BodyRowClassNameFunction = (item: Item, rowNumber: number): string => {
        if (item.opened === true) return 'unread';
        return 'read';
    };
    const themeColor = "#37515f"

    const toggleRead = () => {
        window.alert("clicked")
    }
  </script>
  
<style lang="scss">
.hyyp-inbox {
    
    .customize-table {
    --easy-table-border: #fff;
    --easy-table-row-border: 1px solid #dcdcdc;

    --easy-table-header-font-size: 11px;
    --easy-table-header-font-weight: 400;
    --easy-table-header-text-transform: uppercase;
    --easy-table-header-height: 30px;
    --easy-table-header-font-color: $black;
    --easy-table-header-background-color: inherit;

    --easy-table-header-item-padding: 10px 15px 2px 15px;

    --easy-table-body-even-row-font-color: #100409;

    --easy-table-body-row-font-color: $black;
    --easy-table-body-row-height: 50px;
    --easy-table-body-row-font-size: 14px;

    --easy-table-body-row-hover-background-color:#F2CED3;
    
    --easy-table-body-item-padding: 10px 15px;

    --easy-table-footer-background-color: #f0f0f0;
    --easy-table-footer-font-color: $black;
    --easy-table-footer-font-size: 14px;
    --easy-table-footer-padding: 10px 40px 0px 10px;
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
        td {
            font-weight: 600;
        }
    }
    .read {
        --easy-table-body-row-background-color: #f0f0f0;
    }
    .vue3-easy-data-table__footer[data-v-32683533] {
        justify-content: flex-start;
        width: calc(100% - 40px);
        padding-top: 10px;
        border: none;
        outline: none;
    }
    .pagination__items-index {
        order: 1;
        width: 80%;
        position: relative;
        left: 20px;
    }
    .pagination__rows-per-page {
        order: 2;
        text-transform: capitalize;
        font-weight: 500;
        flex-wrap: nowrap;
        min-width: 200px;
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
.action-tray {
    display: flex;
    padding-bottom: 20px;
    padding-left: 20px;
    .icon-btn {
        display: flex;
        align-items: center;
        margin: 0 5px;
        padding: 5px 10px;
        border-radius: 5px;
        transition: 300ms ease-in-out all;      
        &:hover {
            background: #f6f6f6;
            transition: 350ms ease-in-out all;
        }
        i {
           font-size: 20px;  
        }
        span {
            padding-left: 10px;
            font-size: 0.8rem;
        } 
    }
}
.vue3-easy-data-table__footer  {
    position: fixed;
    bottom: 10px;
}
</style>