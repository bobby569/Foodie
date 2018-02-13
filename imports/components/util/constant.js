const { url, id, key } = Meteor.settings.public.edamam;
export const API = `${url}?app_id=${id}&app_key=${key}`;
export const URI_BASE = `http://www.edamam.com/ontologies/edamam.owl#recipe_`;
export const URI_LEN = URI_BASE.length;
