<script setup lang="ts">
const form = reactive({
  name: '',
  email: '',
  distance: '',
  experience: '',
  sessionType: '',
})

const errors = reactive<Record<string, string>>({})
const submitted = ref(false)
const submitting = ref(false)

const distanceOptions = ['5 KM', '8–10 KM', '12–15 KM', '15 KM+']
const experienceOptions = ['Beginner', 'Returning', 'Intermediate', 'Advanced']
const sessionOptions = ['Monday easy', 'Friday speed', 'Weekend LSD', 'Mix of everything']

function validate() {
  const next: Record<string, string> = {}
  if (!form.name.trim() || form.name.trim().length < 2) {
    next.name = 'Tell us what to call you (at least 2 characters).'
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    next.email = 'Enter a valid email address.'
  }
  if (!form.distance) next.distance = 'Pick a preferred distance.'
  if (!form.experience) next.experience = 'Select your experience level.'
  if (!form.sessionType) next.sessionType = 'Choose a session you like.'
  Object.keys(errors).forEach(k => delete errors[k])
  Object.assign(errors, next)
  return Object.keys(next).length === 0
}

async function onSubmit() {
  submitted.value = false
  if (!validate()) return
  submitting.value = true
  await new Promise(r => setTimeout(r, 700))
  submitting.value = false
  submitted.value = true
}
</script>

<template>
  <section id="join" class="bg-magenta text-carbon">
    <div class="mx-auto max-w-site px-4 py-20 md:px-8 md:py-28">
      <div class="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-5">
          <p class="font-mono text-[10px] uppercase tracking-technical text-carbon/70">06 — Join</p>
          <h2 class="mt-3 font-display text-[clamp(2.8rem,8vw,6rem)] uppercase leading-[0.85] tracking-tightest">
            YOUR PACE.<br>
            YOUR PEOPLE.<br>
            7PM.
          </h2>
          <p class="mt-6 max-w-sm text-base text-carbon/80">
            Meet us at Maples Grove, General Trias, Cavite. This form is a front-end demo — we won’t claim your details were saved.
          </p>
          <img
            src="/logo.png"
            alt=""
            class="mt-8 hidden h-16 w-auto opacity-90 lg:block"
            width="200"
            height="64"
            aria-hidden="true"
          >
        </div>

        <div class="border border-night/20 bg-night p-6 text-ink md:p-8 lg:col-span-7">
          <div
            v-if="submitted"
            class="border border-magenta bg-magenta/20 p-6"
            role="status"
          >
            <p class="font-display text-3xl uppercase tracking-tightest text-magenta">
              See you at the Grove.
            </p>
            <p class="mt-3 text-sm text-chrome">
              Thanks, {{ form.name }}. In a real build this would reach the club. Here, nothing was permanently stored or emailed.
            </p>
            <button
              type="button"
              class="btn-primary mt-6"
              @click="submitted = false; Object.assign(form, { name: '', email: '', distance: '', experience: '', sessionType: '' })"
            >
              Submit another
            </button>
          </div>

          <form v-else class="space-y-5" novalidate @submit.prevent="onSubmit">
            <div>
              <label for="join-name" class="section-label">Name</label>
              <input
                id="join-name"
                v-model="form.name"
                type="text"
                autocomplete="name"
                class="mt-2 w-full border border-ink/20 bg-transparent px-4 py-3 text-ink placeholder:text-mute focus:border-magenta"
                placeholder="Your name"
                :aria-invalid="Boolean(errors.name)"
                :aria-describedby="errors.name ? 'err-name' : undefined"
              >
              <p v-if="errors.name" id="err-name" class="mt-1 text-sm text-magenta">{{ errors.name }}</p>
            </div>

            <div>
              <label for="join-email" class="section-label">Email</label>
              <input
                id="join-email"
                v-model="form.email"
                type="email"
                autocomplete="email"
                class="mt-2 w-full border border-ink/20 bg-transparent px-4 py-3 text-ink placeholder:text-mute focus:border-magenta"
                placeholder="you@example.com"
                :aria-invalid="Boolean(errors.email)"
                :aria-describedby="errors.email ? 'err-email' : undefined"
              >
              <p v-if="errors.email" id="err-email" class="mt-1 text-sm text-magenta">{{ errors.email }}</p>
            </div>

            <div class="grid gap-5 sm:grid-cols-2">
              <div>
                <label for="join-distance" class="section-label">Preferred distance</label>
                <select
                  id="join-distance"
                  v-model="form.distance"
                  class="mt-2 w-full border border-ink/20 bg-night px-4 py-3 text-ink focus:border-magenta"
                  :aria-invalid="Boolean(errors.distance)"
                >
                  <option value="" disabled>Select</option>
                  <option v-for="opt in distanceOptions" :key="opt" :value="opt">{{ opt }}</option>
                </select>
                <p v-if="errors.distance" class="mt-1 text-sm text-magenta">{{ errors.distance }}</p>
              </div>

              <div>
                <label for="join-experience" class="section-label">Experience</label>
                <select
                  id="join-experience"
                  v-model="form.experience"
                  class="mt-2 w-full border border-ink/20 bg-night px-4 py-3 text-ink focus:border-magenta"
                  :aria-invalid="Boolean(errors.experience)"
                >
                  <option value="" disabled>Select</option>
                  <option v-for="opt in experienceOptions" :key="opt" :value="opt">{{ opt }}</option>
                </select>
                <p v-if="errors.experience" class="mt-1 text-sm text-magenta">{{ errors.experience }}</p>
              </div>
            </div>

            <fieldset>
              <legend class="section-label">Preferred session</legend>
              <div class="mt-3 flex flex-wrap gap-2">
                <label
                  v-for="opt in sessionOptions"
                  :key="opt"
                  class="cursor-pointer border px-3 py-2 font-mono text-[10px] uppercase tracking-technical transition-colors"
                  :class="form.sessionType === opt ? 'border-magenta bg-magenta text-carbon' : 'border-ink/20 hover:border-magenta/50'"
                >
                  <input v-model="form.sessionType" type="radio" :value="opt" class="sr-only">
                  {{ opt }}
                </label>
              </div>
              <p v-if="errors.sessionType" class="mt-1 text-sm text-magenta">{{ errors.sessionType }}</p>
            </fieldset>

            <button type="submit" class="btn-primary w-full sm:w-auto" :disabled="submitting">
              {{ submitting ? 'Sending…' : 'Request invite' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
