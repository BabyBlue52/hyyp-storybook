<template>
    <div class="container">
        <div v-for="res in res">
            <!-- Org Type -->
            <div :class="res.type">
                <a :href="res.url"> 
                    <div class="result-wrapper">
                    <div v-if="res.type === 'venue'" class="icon">
                        <svg viewBox="0 0 57 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M28.1232 4.51361H32.8105V9.02722H37.4977V17.3819L53.9029 23.2902V51.9065H56.2465V54.1633H0V51.9065H2.3436V27.0816H16.4052V9.02722H21.0924V4.51361H25.7796V0H28.1232V4.51361ZM35.1541 11.284H18.7488V51.9065H21.0924V47.3929H32.8105V51.9065H35.1541V11.284ZM30.4669 49.6497H23.436V51.9065H30.4669V49.6497ZM49.2157 51.9065H51.5593V24.8542L37.4977 19.7922V51.9065H39.8413V47.3929H49.2157V51.9065ZM16.4052 29.3384H4.68721V51.9065H7.03081V47.3929H14.0616V51.9065H16.4052V29.3384ZM11.718 49.6497H9.37442V51.9065H11.718V49.6497ZM46.8721 49.6497H42.1849V51.9065H46.8721V49.6497ZM9.37442 38.3657V42.8793H7.03081V38.3657H9.37442ZM14.0616 38.3657V42.8793H11.718V38.3657H14.0616ZM25.7796 15.7976V42.8793H23.436V15.7976H25.7796ZM49.2157 40.6225V42.8793H39.8413V40.6225H49.2157ZM30.4669 15.7976V42.8793H28.1232V15.7976H30.4669ZM49.2157 36.1089V38.3657H39.8413V36.1089H49.2157ZM9.37442 31.5953V36.1089H7.03081V31.5953H9.37442ZM14.0616 31.5953V36.1089H11.718V31.5953H14.0616ZM49.2157 31.5953V33.8521H39.8413V31.5953H49.2157ZM49.2157 27.0816V29.3384H39.8413V27.0816H49.2157ZM30.4669 6.77041H23.436V9.02722H30.4669V6.77041Z" fill="black"/>
                                </svg>
                    </div>
                    <div v-if="res.type === 'organization'" class="icon">
                        <svg viewBox="0 0 55 37" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.1894 27.8132C28.4442 26.5986 33.3346 25.5353 30.9673 21.0619C23.7554 7.44713 29.0537 0.166504 36.669 0.166504C44.4331 0.166504 49.6008 7.72671 42.3706 21.0642C39.93 25.565 45.0037 26.6261 50.1463 27.8155C54.6952 28.865 55 31.088 55 34.9357L54.9931 36.8332H51.9475C51.9475 32.0459 52.1377 31.4088 49.1379 30.7167C44.7815 29.713 40.6702 28.7642 39.1669 25.4367C38.6192 24.2221 38.2617 22.2238 39.6848 19.609C42.829 13.8065 43.6242 8.77859 41.8596 5.82005C39.7925 2.34359 33.5706 2.36192 31.5196 5.76963C29.7596 8.68692 30.5433 13.7423 33.6646 19.6342C35.0556 22.2605 34.689 24.2542 34.1367 25.4619C32.6242 28.7734 28.4717 29.7313 24.0763 30.7442C21.2071 31.4088 21.3904 32.0917 21.3904 36.8332H18.3402C18.3402 31.8007 17.9369 29.0278 23.1894 27.8132ZM0.00458333 36.8332H3.05021C3.05021 32.4378 2.62396 33.6592 7.23021 32.3117C9.55396 31.6357 11.6073 30.6548 12.5377 28.6175C13.0235 27.5565 13.3513 25.8217 12.1665 23.5828C9.98479 19.4623 9.37292 15.8507 10.5348 13.9234C11.7883 11.8403 15.7369 11.8425 16.995 13.9578C19.1377 17.5488 15.1777 23.0832 14.6575 25.3748H17.8567C18.865 23.0832 20.6204 20.3148 20.6204 16.4373C20.6204 11.8311 17.6138 9.33317 13.75 9.33317C8.03687 9.33317 4.06312 14.7942 9.47375 25.0059C11.2475 28.3609 7.58083 29.1584 3.64146 30.0682C0.226875 30.8588 0 32.5248 0 35.4169L0.00458333 36.8332Z" fill="black"/>
        </svg>
                    </div>
                    <div v-if="res.type === 'event'" class="icon">
                        <svg viewBox="0 0 55 51" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M55 50.7087H0V7.16699H9.16667V0.291992H18.3333V7.16699H36.6667V0.291992H45.8333V7.16699H55V50.7087ZM52.7083 16.3337H2.29167V48.417H52.7083V16.3337ZM14.8935 36.4866L17.2585 36.1932C17.7192 38.3245 18.8467 39.7178 21.026 39.7178C23.2192 39.7178 24.9929 38.1457 24.9929 35.9732C24.9929 33.7068 23.0473 31.8735 19.5548 32.7305L19.8183 30.7987C21.9037 31.0049 24.1267 30.0012 24.1267 27.8241C24.1267 26.2795 22.9167 25.0191 20.9733 25.0191C19.1606 25.0191 17.8475 26.071 17.4946 28.2503L15.1296 27.8585C15.7208 24.8357 17.9415 23.2087 20.9206 23.2087C24.1542 23.2087 26.5558 25.2551 26.5558 27.8722C26.5558 29.3526 25.724 30.7253 23.9021 31.5068C26.1777 31.9949 27.5 33.6014 27.5 35.9251C27.5 39.271 24.5346 41.542 21.0123 41.542C17.5037 41.542 15.1983 39.3764 14.8935 36.4866ZM36.6667 41.542H34.304V27.1847C33.1146 28.2412 31.201 29.3549 29.7917 29.8407V27.7118C32.8075 26.3918 34.4575 24.4989 35.145 23.2087H36.6667V41.542ZM52.7083 9.45866H2.29167V14.042H52.7083V9.45866ZM16.0417 2.58366H11.4583V7.16699H16.0417V2.58366ZM43.5417 2.58366H38.9583V7.16699H43.5417V2.58366Z" fill="black"/>
                        </svg>
                    </div>
                    <div class="content">
                        
                            <h2>{{ res.title }}</h2>
                        
                        <p>{{ res.location }}</p>
                        <div class="d-flex">
                            <div v-for="cat in res.categories" class="category">
                                <span>{{ cat }}</span>
                            </div>
                        </div>
                    </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Search Result',
    data: () => ({
        res: [
            {
                type: "venue",
                title: "Perch Dance Studio",
                location: "Cincinnati, OH, United States",
                categories: ["tag one", "tag two"],
                url: "https://www.duckduckgo.com"
            },
            {
                type: "organization",
                title: "Perch Dancing Group",
                location: "Cincinnati, OH, United States",
                categories: ["beginner-friendly"],
                url: "https://www.duckduckgo.com"
            },
            {
                type: "event",
                title: "Zumba in the Park",
                location: "Cincinnati, OH, United States",
                categories: ["pets welcome", "weekend"],
                url: "https://www.duckduckgo.com"
            },
            {
                type: "venue",
                title: "Perch Dance Studio",
                location: "Cincinnati, OH, United States",
                categories: ["tag one", "tag two"],
                url: "https://www.duckduckgo.com"
            },
            {
                type: "organization",
                title: "Perch Dancing Group",
                location: "Cincinnati, OH, United States",
                categories: ["beginner-friendly"],
                url: "https://www.duckduckgo.com"
            },
            {
                type: "event",
                title: "Zumba in the Park",
                location: "Cincinnati, OH, United States",
                categories: ["pets welcome", "weekend"],
                url: "https://www.duckduckgo.com"
            },
        ]
    }),
    methods: {
    }
}
</script>

<style scoped lang="scss">
@import "../../assets/variables";
h2 {
    font-size: 1.1rem;
    font-weight: 600;
}
div.container {
    overflow-y: scroll;
    width: calc(60vw + 25px);
    max-height: 500px;
    padding-bottom: 20px;
    padding-right: 10px;
    padding-left: 10px;
}
div.organization {
    .result-wrapper {
        display: flex;
        position: relative;
        height: max-content;
        width: 60vw;
        max-width: 800px;
        border: 1px solid $grey_mid;
        border-radius: $border-radius;
        padding: 10px;
        margin: 10px 0;
        &:hover {
            background: $grey;
            border: 1px solid $grey_mid;
            h2 {
                text-decoration: underline;
            }
        }
        .icon {
            height: 60px;
            width: 60px;
            padding: 5px;
        }
        .content {
            margin-left: 20px;
            margin-top: -5px;
            h2 {
                font-size: $medium; 
            }
            p {
                margin-left: 1px;
                margin-bottom: 8px;
            }
        }
    }
    div.category {
        height: 20px;
        width: max-content;
        padding: 0px 25px;
        margin: 0 10px 0 0;
        border-radius: $border-radius;
        background: rgba($gunMetal, 0.25);
        span {
            position: relative;
            font-size: $small;
            margin: 0;
            padding: 0;
            font-weight: $heavy;
            text-transform: capitalize;
        }
    }
}

div.venue {
    @extend .organization;
    div.category {
        background: rgba($primary, 0.5);
    }
}

div.event {
    @extend .organization;
    div.category {
        background: rgba($success, 0.25);
    }
}
</style>