import { createRouter, createWebHistory } from "vue-router";
import LandingPortal from "../views/guest/LandingPortal.vue";
import OrganizationList from "../views/admin/Organizations/OrganizationsList.vue";
import { checkeradmin, checkerer, checkerr } from "../../auth/isauth";
import Settings from "@/views/shared/Documents/settings.vue";
import Admin from "../views/admin/Admin";
import AdminDashboard from "@/views/admin/AdminDashboard";
import Institution from "@/views/institution/Institution";
import InstitutionDashboard from "@/views/institution/InstitutionDashboard";
import UsersList from "@/views/institution/Users/UsersList";
import DocumentList from "@/views/shared/Documents/DocumentList";
import DocumentView from "@/views/shared/Documents/DocumentView.vue";
import DocumentDetails from "@/views/shared/Documents/DocumentDetails.vue";
import Operator from "@/views/operator/Operator.vue";
import OperatorDashboard from "@/views/operator/OperatorDashboard.vue";
import verifyTest from "@/views/guest/verify.test.vue";

async function checkAuth(to, from, next) {
  // let isAuthenticated = await checkerr();
  let isAuthenticated = true;
  if (isAuthenticated) {
    next();
  } else {
    next("/");
  }
}

async function checkAuth1(to, from, next) {
  //let isAuthenticated = await checkeradmin();
  let isAuthenticated = true;
  console.log(isAuthenticated);

  if (isAuthenticated) {
    next();
  } else {
    next("/");
  }
}

async function checkAuth2(to, from, next) {
  // let isAuthenticated = await checkerer();
  let isAuthenticated = true;
  console.log(isAuthenticated);

  if (true) {
    next();
  } else {
    next("/");
  }
}

// const routes = [
//   {
//     path: "/operator",
//     name: "dashPage",
//     component: dashPage,
//     beforeEnter: checkAuth,
//   },
//   {
//     path: "/",
//     name: "home",
//     component: HomeView,
//   },
//   {
//     path: "/share",
//     name: "about",
//     component: share,
//     beforeEnter: checkAuth,
//   },
//
//   {
//     path: "/admin",
//     name: "admin",
//     component: Admin,
//     beforeEnter: checkAuth1,
//     children: [
//       {
//         path: "institution",
//         name: "institution",
//         component: OrganizationList,
//       },
//     ],
//   },
//   {
//     path: "/verify",
//     name: "verify",
//     component: verify,
//     beforeEnter: checkAuth,
//   },
//   {
//     path: "/admin/",
//     name: "view",
//     component: view,
//     beforeEnter: checkAuth1,
//   },
//   {
//     path: "/institution",
//     name: "memberAdd",
//     component: instAdmin,
//     beforeEnter: checkAuth2,
//   },
//   {
//     path: "/memberView",
//     name: "members",
//     component: members,
//     beforeEnter: checkAuth2,
//   },
//   {
//     path: "/sharedDocs",
//     name: "sharedDocs",
//     component: sharedDocs,
//     beforeEnter: checkAuth,
//   },
//   {
//     path: "/documentDetails/:cidvalue",
//     name: "documentDetails",
//     component: documentDetails,
//     beforeEnter: checkAuth,
//   },
// ];

export const routes = [
  {
    path: "/",
    name: "home",
    component: LandingPortal,
  },

  {
    path: "/admin",
    redirect: "/admin/dashboard",
    component: Admin,
    beforeEnter: checkAuth1,
    children: [
      {
        path: "dashboard",
        component: AdminDashboard,
      },
      {
        path: "institutions",
        component: OrganizationList,
      },
      {
        path: "settings",
        component: Settings,
      },
    ],
  },
  {
    path: "/institution",
    redirect: "/institution/dashboard",
    component: Institution,
    beforeEnter: checkAuth2,
    children: [
      {
        path: "dashboard",
        component: InstitutionDashboard,
      },
      {
        path: "users",
        component: UsersList,
      },
      {
        path: "documents",
        component: DocumentList,
        meta: { userAccessed: "institution" },
      },
      {
        path: "document-view/:cid/:documentName",
        component: DocumentView,
        meta: { userAccessed: "institution" },
      },
      {
        path: "document-details/:cid/:documentId",
        component: DocumentDetails,
        meta: { userAccessed: "institution" },
      },
      {
        path: "settings",
        component: Settings,
      },
    ],
  },
  {
    path: "/operator",
    redirect: "/operator/dashboard",
    component: Operator,
    beforeEnter: checkAuth,
    children: [
      {
        path: "dashboard",
        component: OperatorDashboard,
      },
      {
        path: "documents",
        component: DocumentList,
        meta: { userAccessed: "operator" },
      },
      {
        path: "document-view/:cid/:documentName",
        component: DocumentView,
        meta: { userAccessed: "operator" },
      },
      {
        path: "document-details/:cid",
        component: DocumentDetails,
        meta: { userAccessed: "operator" },
      },
      {
        path: "/settings",
        name: "settings",
        component: Settings,
      },
    ],
  },

  {
    path: "/verify",
    name: "verify",
    component: verifyTest,
    children: [
      {
        path: "document-view/:cid/:documentName",
        component: DocumentView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
