const mongoose = require('mongoose');

const pagesSchema = new mongoose.Schema({
    pageName: {
        type: String,
        required: true,
    },
    widgetList: {
        type: String,
        get: function(data) {
          try { 
            return JSON.parse(data);
          } catch(error) { 
            return data;
          }
        },
        set: function(data) {
          return JSON.stringify(data);
        }
    },
});

module.exports = mongoose.model('Page', pagesSchema);