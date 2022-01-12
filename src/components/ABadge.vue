<template>
  <component :is="tag" class="badge" :class="`badge-${type}`">
    <slot></slot>
  </component>
</template>
<script>
import config from "../../configuraciones.js";
export default {
  name: "badge",
  props: {
    tag: {
      type: String,
      default: "span",
      description: "Badge tag",
    },
    type: {
      type: String,
      default: "default",
      validator: (value) => {
        let acceptedValues = [
          "primary",
          "info",
          "success",
          "warning",
          "danger",
          "default",
        ];
        return acceptedValues.indexOf(value) !== -1;
      },
      description: "Badge type (primary|info|success|warning|danger|default)",
    },
  },
};
</script>
<style lang="scss">
@import "./configuraciones.scss";
.badge {
  text-transform: uppercase;
  line-height: 12px;
  border: none;
  text-decoration: none;
  margin-bottom: 5px;

  font-size: 0.8rem;

  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:hover,
  &:focus {
    text-decoration: none;
  }

  display: inline-block;
  padding: 0.25rem 0.5rem;

  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;

  // Empty badges collapse automatically
  &:empty {
    display: none;
  }
}

.badge-icon {
  padding: 0.4em 0.55em;

  i {
    font-size: 0.8em;
  }
}

.badge-success {
  color: color-yiq(darken($success, 10%));
  background-color: darken($success, 10%);

  .tagsinput-remove-link {
    color: white;
  }
}

// Quick fix for badges in buttons
.btn .badge {
  position: relative;
  top: -1px;
}

// Pill badges
//
// Make them extra rounded with a modifier to replace v3's badges.

.badge-pill {
  padding-right: 0.875em;
  padding-left: 0.875em;
  border-radius: 0.875rem;
}

.badge-primary {
  color: #ffffff;
  background-color: $primary;
}
</style>
