import { createStore } from 'vuex'
import comment from "@/store/modules/comment.js"
import article from "@/store/modules/article.js"

const store = createStore({
    modules:{
        comment,
        article
    }
})

export default store