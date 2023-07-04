<template>
    <div class="toggle">
        <v-btn @click="handleToggle()">Toggle Contact Sidebar</v-btn>
    </div>
    <div :class="[openSidebar ? '' : 'closed']" class="hyyp-sidebar">
        <div class="sidebar-title">
            <button class="close-btn" @click="handleToggle()">
                    <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
                </button>
        </div>
        <!-- Static -->
        <div v-if="!editMode">
            <!-- Profile Pic -->
            <div class="d-flex profile">
                <div v-if="!imgUrl"> </div>
                <img :src=profile.imgUrl alt="profile pic" class="profile-pic" />
                <div class="inline ">
                    <h4>{{ profile.username }}</h4>
                    <p>{{ profile.role }}</p>
                </div>
            </div>
            <!-- Phone Number -->
            <div class="section">
                <div class="d-flex ">
                    <div class="icon">
                        <v-icon icon="mdi-phone-outline"></v-icon>
                    </div>
                    <p id="phone">{{ profile.phone }}</p>
                </div>
            </div>
    
            <!-- Email -->
            <div class="section">
                <div class="d-flex ">
                    <div class="icon">
                        <v-icon icon="mdi-email-outline"></v-icon>
                    </div>
                    <p id="phone">{{ profile.email }}</p>
                </div>
            </div>
    
            <!-- Location  -->
            <div class="section">
                <div class="d-flex ">
                    <div class="icon">
                        <v-icon icon="mdi-map-marker"></v-icon>
                    </div>
                    <p id="phone">{{ profile.location }}</p>
                </div>
            </div>
    
            <!-- Last Worked With -->
            <div class="section">
                <div class="d-flex">
                    <div class="icon">
                        <v-icon icon="mdi-briefcase-outline"></v-icon>
                    </div>
                    <p id="phone">Last Worked With:</p>
                </div>
                <div class="blank"></div>
            </div>
        </div>
        <!-- Dynamic -->
        <div v-else class="edit-mode">
            <!-- Profile -->
            <div class="profile">
                <div v-if="!profile.imgUrl">DK</div>
                <div v-else class="center">
    
                    <CameraButton/>
                    <span class="edit-mode"> Edit Mode</span>
    
                </div>
            </div>
            <div style="display: flex; flex-direction: column; max-height:600px; overflow: scroll;">
                <!-- Name -->
                <div class="section">
                    <div class="d-flex">
                        <div class="icon">
                            <v-icon icon="mdi-account-outline"></v-icon>
                        </div>
                        <TextInput style="width:220px" label="name" />
                    </div>
                </div>
                <!--  Role -->
                <div class="section">
                    <div class="d-flex">
                        <div class="icon">
                            <v-icon icon="mdi-account-outline"></v-icon>
                        </div>
                        <TextInput style="width:220px" label="role" />
                    </div>
                </div>
                <!-- Phone Number -->
                <div class="section">
                    <div class="d-flex">
                        <div class="icon">
                            <v-icon icon="mdi-phone-outline"></v-icon>
                        </div>
                        <TextInput style="width:220px" label="phone number" />
                    </div>
                </div>
    
                <!-- Email -->
                <div class="section">
                    <div class="d-flex ">
                        <div class="icon">
                            <v-icon icon="mdi-email-outline"></v-icon>
                        </div>
                        <TextInput style="width:220px" label="email" />
                    </div>
                </div>
    
                <!-- Location -->
                <div class="section">
                    <div class="d-flex">
                        <div class="icon">
                            <v-icon icon="mdi-map-marker"></v-icon>
                        </div>
                        <TextInput style="width:220px" label="location" />
                    </div>
                </div>
            </div>
            <div claass="section ">
                <div class="d-flex delete">
                    <a class="text-center">
                            <button>
                                <p>Delete Contact?</p>
                            </button>
                        </a>
                </div>
            </div>
        </div>
        <!-- Sidebar Button  -->
        <div v-if="!editMode">
            <button class="full-width-btn" @click="toggleEditMode()"> Edit Contact</button>
        </div>
        <div v-else class="">
            <button class="full-width-save-btn" @click="toggleEditMode()"> Save Changes</button>
        </div>
    </div>
</template>

<script>
import TextInput from '../TextInput.vue';
import CameraButton from '../Buttons/CameraButton.vue';

export default {
    name: 'Contact Sidebar',
    components: { TextInput, CameraButton },
    props: {
        openSidebar: Boolean,
        editMode: Boolean,
        userInitials: String,
        imgUrl: String,
        username: String,
        role: String,
        phone: String,
    },
    data() {
        return {
            openSidebar: true,
            profile: {
                userInitials: "NC",
                imgUrl: "https://plus.unsplash.com/premium_photo-1675034359203-c30acdb21eb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
                username: "Noelle Chapman",
                role: "Cake Decorator",
                phone: "(460)-101-7698",
                location: "Austin, TX",
                email: "noelle.chapman@example.com"
            }
        };
    },
    methods: {
        handleToggle() {

            // If user closes sidebar in edit mode reset back to static
            if (this.openSidebar == false) {
                this.editMode == false
                this.openSidebar = !this.openSidebar
            } else {
                this.openSidebar = !this.openSidebar;
            }
        },
        toggleEditMode() {
            this.editMode = !this.editMode
        }
    },
    computed: {

    }
}
</script>

<style scoped>
.hyyp-sidebar {
    position: absolute;
    right: 0;
    width: clamp(10vw, 350px, 500px);
    height: 100%;
    padding: 20px 30px;
    -webkit-box-shadow: -9px 3px 14px -1px rgba(0, 0, 0, 0.10);
    -moz-box-shadow: -9px 3px 14px -1px rgba(0, 0, 0, 0.10);
    box-shadow: -9px 3px 14px -1px rgba(0, 0, 0, 0.10);
}

.closed {
    position: absolute;
    right: -450px;
    width: clamp(10vw, 350px, 500px);
    height: 100%;
    -webkit-box-shadow: -9px 3px 14px -1px rgba(0, 0, 0, 0.10);
    -moz-box-shadow: -9px 3px 14px -1px rgba(0, 0, 0, 0.10);
    box-shadow: -9px 3px 14px -1px rgba(0, 0, 0, 0.10);
}

.profile {
    position: relative;
    padding-top: 40px;
    background: #ffffff;
}

img.profile-pic {
    min-width: 100px;
    min-height: 100px;
    max-width: 100px;
    max-height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
    margin-bottom: 20px;
    margin-left: 20px;
    border: 2px solid #E4959E;
}

.inline {
    display: flex;
    flex-direction: column;
    vertical-align: middle;
    padding-top: 10px;
}

.center {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 0 auto;
}

button.full-width-btn {
    display: bock;
    width: 100%;
    position: absolute;
    bottom: 58px;
    right: 0px;
    background: #37515F;
    color: white;
    padding: 15px 0px;
    z-index: 999;
}

button.full-width-btn:hover {
    background: #52798E;
}

button.full-width-save-btn {
    display: block;
    width: 100%;
    position: absolute;
    bottom: 58px;
    right: 0px;
    background: #59D96C;
    color: #100409;
    padding: 15px 0px;
    z-index: 999;
}

/* Disabled */

button.disabled {
    width: 200px;
    max-width: 200px;
    height: 48px;
    border-radius: 5px;
    background-color: #c8c8c8;
    ;
    border: 2px solid transparent;
    color: #666;
}

button.close-btn {
    width: max-content;
    height: max-content;
    margin: 0;
    padding: 0;
    background: none;
    position: absolute;
    right: 0%;
}
span.edit-mode {
        position: absolute;
        left: 200px;
        top: 80px;
        clear: none;
        width: max-content;
        height: max-content;
        padding: 2px 10px;
        border-radius: 5px;

        font-size: .8rem;
        font-weight: 600;
        text-transform: uppercase;
        background: rgba(228, 149, 158, 0.5);
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
    }
.edit-mode>.section {
    padding: 0;
}

.section>.d-flex>p {
    padding-top: 12px;
    white-space: wrap;
}

.icon {
    position: relative;
    padding: 20px 15px 0px 15px;
}

.blank {
    background: #ccc;
    width: 80%;
    height: 150px;
    margin-top: 20px;
    margin-left: 20%;
}

input.v-field__input {
    width: 200px;
}

.section>.d-flex>p {
    margin-top: 10px;
}

.delete {
    display: flex;
    justify-content: center;
}

.delete>a {
    width: max-content;
    margin-top: 10px;
    font-weight: 500;
    color: #ff4d4d;
    border-bottom: 1px solid #ff4d4d;
}
</style>