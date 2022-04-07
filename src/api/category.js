import userReq from '@/utils/request'
import adminReq from '@/utils/request-admin'
import store from "@/store";

// 查询分类列表
export function getAll() {
    return userReq({
        url: '/category/getAll',
        method: 'get'
    })
}

export function getAllForAdmin() {
    return adminReq({
        url: '/category',
        method: 'get'
    })
}

/**
 * 根据 id 删除分类
 * @param id 分类 id
 * @return {*} promise
 */
export function removeCategoryById(id) {
    return adminReq({
        url: '/category/' + id,
        method: 'delete'
    })
}

/**
 * 保存分类
 * @param name 分类名
 * @param pid 父分类 id
 * @param description 描述
 * @return {*} promise
 */
export function saveCategory(name, pid, description) {
    return adminReq({
        url: '/category',
        method: 'post',
        data:{
            name,
            pid,
            description,
            status: 0,
            createBy: store.state.userInfo.id
        }
    })
}