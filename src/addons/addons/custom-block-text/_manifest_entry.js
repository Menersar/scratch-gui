/* generated by pull.js */
const manifest = {
  "name": "Customizable block text style",
  "description": "Changes the thickness of the text on blocks and optionally adds a text shadow.",
  "tags": [],
  "credits": [
    {
      "name": "Secret-chest"
    },
    {
      "name": "_nix",
      "link": "https://scratch.mit.edu/users/_nix"
    }
  ],
  "userstyles": [
    {
      "url": "text-bold.css",
      "if": {
        "settings": {
          "bold": true
        }
      }
    },
    {
      "url": "text-shadow.css",
      "if": {
        "settings": {
          "shadow": true
        }
      }
    }
  ],
  "settings": [
    {
      "dynamic": true,
      "name": "Bold text",
      "id": "bold",
      "type": "boolean",
      "default": false
    },
    {
      "dynamic": true,
      "name": "Shadow under text",
      "id": "shadow",
      "type": "boolean",
      "default": false
    }
  ],
  "dynamicDisable": true,
  "enabledByDefault": false
};
export default manifest;
