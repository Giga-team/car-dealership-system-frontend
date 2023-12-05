import {ActivatedRoute, Router} from "@angular/router";

export function calculatePageCount(totalRecords: number, limit: number): number {
    return Math.ceil(totalRecords / limit);
}
//
// export function navigateToPage(router: Router, route: ActivatedRoute,
//                                pageNumber: number, queryParams: any) {
//     router.navigate([], {
//         relativeTo: route,
//         queryParams: {...queryParams, page: pageNumber}
//     })
// }
//
// export function isCurrentPageActive(currentPage: number, selectedPage: number): boolean {
//     return currentPage === selectedPage;
// }
//
// export function getQueryParams(route: ActivatedRoute): any {
//     console.log("query params: ",route.snapshot.queryParams)
//     return route.snapshot.queryParams;
// }

export function generatePagesNumbers(pagesCount: number) : number[] {
    return Array.from({ length: pagesCount }, (_, index) => index + 1);
}


