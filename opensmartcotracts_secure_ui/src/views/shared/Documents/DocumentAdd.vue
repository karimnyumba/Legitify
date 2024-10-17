<template>
  <div class="flex flex-col">
    <v-dialog v-model="dialog" width="500">
      <div class="rounded-lg bg-white" style="width: 600px !important">
        <DialogHeader
          class="!w-full"
          :dialog="dialog"
          @dialog="onCloseDialog"
        ></DialogHeader>

        <div>
          <v-form
            @submit.prevent="addDocument"
            ref="form"
            class="p-2 shadow-md rounded-md m-2 bg-gray-200"
          >
            <div class="mt-1 pt-2 font-thin text-sm">
              <span class="">Certificate Owner</span>
            </div>

            <v-text-field
              v-model="ownerName"
              :counter="10"
              @change="onChanges"
              :rules="nameRules"
              placeholder="eg.Julius Marenga"
              required
            ></v-text-field>
            <div class="mt-1 font-thin text-sm">
              <span class="">Purpose/Description</span>
            </div>
            <v-text-field
              name="description"
              @change="onChangedescs"
              v-model="description"
              placeholder="Eg. Course Completion"
              required
            ></v-text-field>
            <!-- <div class="">
              <span>GeneratedId- </span>
              <span> {{ randomuuid }}</span>
            </div> -->

            <div class="flex justify-end w-full px-2 py-2">
              <v-btn type="submit" class="mt-4 bg-gradient" color="" block>
                SUBMIT
              </v-btn>
            </div>
          </v-form>
          <!-- <div class="form-holder"> -->
          <!-- <input
              @change="onChanges"
              type="file"
              id="document"
              class="file mx-4"
            /> -->
          <!-- <input
              @change="onChanges"
              type="file"
              id="document"
              class="file mx-4"
            />
            <dynamic-form
              :form="DocumentAddFields"
              @submitted="addDocument"
              @error="handleErrors"
            />
            <button
              submit="true"
              :form="DocumentAddFields.id"
              class="btn-submit btn-submit-right"
            >
              Submit - {{ randomuuid }}
            </button> -->
          <!-- </div> -->
        </div>
      </div>
    </v-dialog>
    <div class="flex flex-row justify-end">
      <v-btn class="btn-outline grow-0" @click="onOpenDialog">
        <v-icon left>mdi-plus</v-icon>
        Create Certificate
      </v-btn>
    </div>
  </div>
</template>

<script>
import { DocumentAddFields } from "./DocumentAddFields";
import DialogHeader from "@/components/shared/DialogHeader";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "DocumentAdd",
  components: { DialogHeader },
  data() {
    return {
      dialog: false,
      DocumentAddFields,
      file: null,
      description: undefined,
      randomuuid: undefined,
      name: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) =>
          (v && v?.length >= 3) || "Name must be greater than 10 characters",
      ],
    };
  },
  methods: {
    async addDocument() {
      this.$store.dispatch("addDocument", {
        ownerName: this.name,
        description: this.description,
        identification: this.randomuuid,
      });

      this.dialog = false;
    },
    async onChanges(e) {
      this.name = e.target.value;
      return this.name;
    },
    async onChangedescs(e) {
      this.description = e.target.value;
      return this.description;
    },
    handleErrors(err) {
      console.log(err);
    },
    onCloseDialog() {
      this.dialog = false;
    },
    onOpenDialog() {
      this.dialog = true;
      this.randomuuid = uuidv4();
    },
    async validate() {
      const { valid } = await this.$refs.form.validate();

      if (valid) alert("Form is valid");
    },
  },
};
</script>

<style scoped></style>
