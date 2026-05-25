# Rendering Vue Components in Mapbox GL JS Popups

This guide explains how to render Vue components inside Mapbox GL JS popups instead of using static HTML.

## Overview

Mapbox GL JS popups typically use `setHTML()` to render static HTML content. However, to render interactive Vue components, you need to use `setDOMContent()` with a Vue app instance.

## Basic Approach

### 1. Create a Vue Component for Popup Content

```vue
<!-- PopupContent.vue -->
<template>
    <div class="popup-content">
        <h3>{{ venue.venue_name }}</h3>
        <h4>${{ venue.price_per_hr }}/hr</h4>
        <button @click="handleBookNow">Book Now</button>
    </div>
</template>

<script>
export default {
    name: 'PopupContent',
    props: {
        venue: {
            type: Object,
            required: true
        },
        onClose: {
            type: Function,
            default: () => {}
        }
    },
    setup(props, { emit }) {
        const handleBookNow = () => {
            emit('book-venue', props.venue);
            props.onClose();
        };

        return { handleBookNow };
    }
}
</script>
```

### 2. Create Popup with Vue Component

```javascript
import { createApp } from 'vue';
import PopupContent from './PopupContent.vue';

const createPopupComponent = (markerData) => {
    // Create container for Vue component
    const container = document.createElement('div');
    container.id = `popup-${markerData.id}`;
    
    // Create Vue app instance
    const popupApp = createApp(PopupContent, {
        venue: markerData,
        onClose: () => {
            popupApp.unmount(); // Clean up when popup closes
        }
    });
    
    // Mount Vue component to container
    popupApp.mount(container);
    
    return container;
};

// Create Mapbox popup
const popup = new mapboxgl.Popup({ 
    offset: 40,
    closeButton: true,
    closeOnClick: false
});

// Set DOM content with Vue component
popup.setDOMContent(createPopupComponent(venueData));

// Attach to marker
new mapboxgl.Marker()
    .setLngLat(coordinates)
    .setPopup(popup)
    .addTo(map);
```

## Advanced Approach with Event Handling

### 1. Using Render Functions

```javascript
import { createApp, h } from 'vue';

const PopupComponent = {
    props: ['venue', 'onAction'],
    setup(props) {
        const handleBookNow = () => {
            props.onAction('book', props.venue);
        };

        return () => h('div', { class: 'advanced-popup' }, [
            h('h3', props.venue.venue_name),
            h('h4', `$${props.venue.price_per_hr}/hr`),
            h('button', {
                onClick: handleBookNow,
                class: 'btn-book'
            }, 'Book Now')
        ]);
    }
};

const createAdvancedPopup = (venue) => {
    const container = document.createElement('div');
    
    const popupApp = createApp({
        setup() {
            const handleAction = (action, venueData) => {
                switch (action) {
                    case 'book':
                        console.log('Booking:', venueData);
                        break;
                    case 'view':
                        window.open(venueData.url, '_blank');
                        break;
                }
            };

            return () => h(PopupComponent, {
                venue,
                onAction: handleAction
            });
        }
    });

    popupApp.mount(container);
    return container;
};
```

## Key Points

### 1. Memory Management
Always unmount Vue apps when popups close to prevent memory leaks:

```javascript
const popup = new mapboxgl.Popup({
    closeButton: true
});

popup.on('close', () => {
    popupApp.unmount();
});
```

### 2. Event Handling
Use Vue's event system to communicate between popup and parent:

```javascript
// In popup component
emit('book-venue', venueData);

// In parent component
popupApp.config.globalProperties.$emit = (event, data) => {
    if (event === 'book-venue') {
        // Handle booking
    }
};
```

### 3. Styling
Style your popup components using scoped styles:

```vue
<style lang="scss" scoped>
.popup-content {
    min-width: 250px;
    padding: 16px;
    
    h3 {
        margin: 0 0 8px 0;
        font-size: 16px;
        font-weight: 600;
    }
    
    button {
        width: 100%;
        padding: 8px 16px;
        background: $primary;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
}
</style>
```

## Best Practices

1. **Component Reusability**: Create reusable popup components that can be used across different markers.

2. **Performance**: Limit the number of popups rendered simultaneously to avoid performance issues.

3. **Accessibility**: Ensure popup content is accessible with proper ARIA labels and keyboard navigation.

4. **Responsive Design**: Make popup content responsive for different screen sizes.

5. **Error Handling**: Handle cases where venue data might be missing or invalid.

## Example Usage in Your Project

The updated `MapComponent.vue` demonstrates this approach:

- Uses `createApp()` to create Vue component instances
- Passes venue data as props to the popup component
- Handles events from the popup component
- Properly cleans up Vue apps when popups close

This approach gives you full Vue reactivity and component capabilities within Mapbox popups while maintaining good performance and memory management.
