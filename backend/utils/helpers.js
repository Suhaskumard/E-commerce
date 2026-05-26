// safe number parser
const safeNumber = (
    value,
    fallback = 0
) => {

    const parsed =
        parseFloat(
            value
        );

    return Number.isFinite(
        parsed
    )
        ? parsed
        : fallback;
};

// safe integer parser
const safeInteger = (
    value,
    fallback = 0
) => {

    const parsed =
        parseInt(
            value,
            10
        );

    return Number.isInteger(
        parsed
    )
        ? parsed
        : fallback;
};

// sanitize string
const sanitizeString = (
    value
) => {

    return String(
        value || ""
    ).trim();
};

// escape html
const escapeHTML = (
    value
) => {

    return String(
        value || ""
    )

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );
};

// pagination helper
const getPagination = (
    page,
    limit,
    maxLimit = 50
) => {

    const safePage =
        Math.max(
            1,
            safeInteger(
                page,
                1
            )
        );

    const safeLimit =
        Math.min(
            maxLimit,
            Math.max(
                1,
                safeInteger(
                    limit,
                    10
                )
            )
        );

    return {

        page:
            safePage,

        limit:
            safeLimit,

        offset:
            (
                safePage - 1
            ) * safeLimit
    };
};

// pagination metadata
const buildPaginationMeta = (
    total,
    page,
    limit
) => {

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                total / limit
            )
        );

    return {

        total,

        page,

        limit,

        totalPages,

        hasNextPage:
            page < totalPages,

        hasPrevPage:
            page > 1
    };
};

// safe array
const safeArray = (
    value
) => {

    return Array.isArray(
        value
    )
        ? value
        : [];
};

// async wrapper
const asyncHandler = (
    fn
) => {
    return (
        req,
        res,
        next
    ) => {
        Promise.resolve(
            fn(
                req,
                res,
                next
            )
        )
            .catch(
                next
            );
    };
};

module.exports = {
    safeNumber,
    safeInteger,
    sanitizeString,
    escapeHTML,
    getPagination,
    buildPaginationMeta,
    safeArray,
    asyncHandler
};