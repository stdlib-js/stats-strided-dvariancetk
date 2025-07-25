<!--

@license Apache-2.0

Copyright (c) 2020 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->


<details>
  <summary>
    About stdlib...
  </summary>
  <p>We believe in a future in which the web is a preferred environment for numerical computation. To help realize this future, we've built stdlib. stdlib is a standard library, with an emphasis on numerical and scientific computation, written in JavaScript (and C) for execution in browsers and in Node.js.</p>
  <p>The library is fully decomposable, being architected in such a way that you can swap out and mix and match APIs and functionality to cater to your exact preferences and use cases.</p>
  <p>When you use stdlib, you can be absolutely certain that you are using the most thorough, rigorous, well-written, studied, documented, tested, measured, and high-quality code out there.</p>
  <p>To join us in bringing numerical computing to the web, get started by checking us out on <a href="https://github.com/stdlib-js/stdlib">GitHub</a>, and please consider <a href="https://opencollective.com/stdlib">financially supporting stdlib</a>. We greatly appreciate your continued support!</p>
</details>

# dvariancetk

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Calculate the [variance][variance] of a double-precision floating-point strided array using a one-pass textbook algorithm.

<section class="intro">

The population [variance][variance] of a finite size population of size `N` is given by

<!-- <equation class="equation" label="eq:population_variance" align="center" raw="\sigma^2 = \frac{1}{N} \sum_{i=0}^{N-1} (x_i - \mu)^2" alt="Equation for the population variance."> -->

```math
\sigma^2 = \frac{1}{N} \sum_{i=0}^{N-1} (x_i - \mu)^2
```

<!-- <div class="equation" align="center" data-raw-text="\sigma^2 = \frac{1}{N} \sum_{i=0}^{N-1} (x_i - \mu)^2" data-equation="eq:population_variance">
    <img src="https://cdn.jsdelivr.net/gh/stdlib-js/stdlib@14f73db6358fc1febe42f8220332bf3af188416c/lib/node_modules/@stdlib/stats/strided/dvariancetk/docs/img/equation_population_variance.svg" alt="Equation for the population variance.">
    <br>
</div> -->

<!-- </equation> -->

where the population mean is given by

<!-- <equation class="equation" label="eq:population_mean" align="center" raw="\mu = \frac{1}{N} \sum_{i=0}^{N-1} x_i" alt="Equation for the population mean."> -->

```math
\mu = \frac{1}{N} \sum_{i=0}^{N-1} x_i
```

<!-- <div class="equation" align="center" data-raw-text="\mu = \frac{1}{N} \sum_{i=0}^{N-1} x_i" data-equation="eq:population_mean">
    <img src="https://cdn.jsdelivr.net/gh/stdlib-js/stdlib@14f73db6358fc1febe42f8220332bf3af188416c/lib/node_modules/@stdlib/stats/strided/dvariancetk/docs/img/equation_population_mean.svg" alt="Equation for the population mean.">
    <br>
</div> -->

<!-- </equation> -->

After rearranging terms, the population [variance][variance] can be equivalently expressed as

<!-- <equation class="equation" label="eq:population_variance_textbook" align="center" raw="\sigma^2 = \frac{1}{N}\biggl(\ \sum_{i=0}^{N-1} x_i^2 - \frac{1}{N}\biggl(\ \sum_{i=0}^{N-1} x_i \ \biggr)^2\ \biggr)" alt="Equation for the population variance (one-pass textbook formula)."> -->

```math
\sigma^2 = \frac{1}{N}\biggl(\ \sum_{i=0}^{N-1} x_i^2 - \frac{1}{N}\biggl(\ \sum_{i=0}^{N-1} x_i \ \biggr)^2\ \biggr)
```

<!-- <div class="equation" align="center" data-raw-text="\sigma^2 = \frac{1}{N}\biggl(\ \sum_{i=0}^{N-1} x_i^2 - \frac{1}{N}\biggl(\ \sum_{i=0}^{N-1} x_i \ \biggr)^2\ \biggr)" data-equation="eq:population_variance_textbook">
    <img src="https://cdn.jsdelivr.net/gh/stdlib-js/stdlib@225f0ea70463a8ba0111dd791d7274ad81ad6c3c/lib/node_modules/@stdlib/stats/strided/dvariancetk/docs/img/equation_population_variance_textbook.svg" alt="Equation for the population variance (one-pass textbook formula).">
    <br>
</div> -->

<!-- </equation> -->

Often in the analysis of data, the true population [variance][variance] is not known _a priori_ and must be estimated from a sample drawn from the population distribution. If one attempts to use the formula for the population [variance][variance], the result is biased and yields a **biased sample variance**. To compute an **unbiased sample variance** for a sample of size `n`,

<!-- <equation class="equation" label="eq:unbiased_sample_variance" align="center" raw="s^2 = \frac{1}{n-1} \sum_{i=0}^{n-1} (x_i - \bar{x})^2" alt="Equation for computing an unbiased sample variance."> -->

```math
s^2 = \frac{1}{n-1} \sum_{i=0}^{n-1} (x_i - \bar{x})^2
```

<!-- <div class="equation" align="center" data-raw-text="s^2 = \frac{1}{n-1} \sum_{i=0}^{n-1} (x_i - \bar{x})^2" data-equation="eq:unbiased_sample_variance">
    <img src="https://cdn.jsdelivr.net/gh/stdlib-js/stdlib@14f73db6358fc1febe42f8220332bf3af188416c/lib/node_modules/@stdlib/stats/strided/dvariancetk/docs/img/equation_unbiased_sample_variance.svg" alt="Equation for computing an unbiased sample variance.">
    <br>
</div> -->

<!-- </equation> -->

where the sample mean is given by

<!-- <equation class="equation" label="eq:sample_mean" align="center" raw="\bar{x} = \frac{1}{n} \sum_{i=0}^{n-1} x_i" alt="Equation for the sample mean."> -->

```math
\bar{x} = \frac{1}{n} \sum_{i=0}^{n-1} x_i
```

<!-- <div class="equation" align="center" data-raw-text="\bar{x} = \frac{1}{n} \sum_{i=0}^{n-1} x_i" data-equation="eq:sample_mean">
    <img src="https://cdn.jsdelivr.net/gh/stdlib-js/stdlib@14f73db6358fc1febe42f8220332bf3af188416c/lib/node_modules/@stdlib/stats/strided/dvariancetk/docs/img/equation_sample_mean.svg" alt="Equation for the sample mean.">
    <br>
</div> -->

<!-- </equation> -->

Similar to the population [variance][variance], after rearranging terms, the **unbiased sample variance** can be equivalently expressed as

<!-- <equation class="equation" label="eq:unbiased_sample_variance_textbook" align="center" raw="s^2 = \frac{1}{n-1}\biggl(\ \sum_{i=0}^{n-1} x_i^2 - \frac{1}{n}\biggl(\ \sum_{i=0}^{n-1} x_i \ \biggr)^2\ \biggr)" alt="Equation for the unbiased sample variance (one-pass textbook formula)."> -->

```math
s^2 = \frac{1}{n-1}\biggl(\ \sum_{i=0}^{n-1} x_i^2 - \frac{1}{n}\biggl(\ \sum_{i=0}^{n-1} x_i \ \biggr)^2\ \biggr)
```

<!-- <div class="equation" align="center" data-raw-text="s^2 = \frac{1}{n-1}\biggl(\ \sum_{i=0}^{n-1} x_i^2 - \frac{1}{n}\biggl(\ \sum_{i=0}^{n-1} x_i \ \biggr)^2\ \biggr)" data-equation="eq:unbiased_sample_variance_textbook">
    <img src="https://cdn.jsdelivr.net/gh/stdlib-js/stdlib@225f0ea70463a8ba0111dd791d7274ad81ad6c3c/lib/node_modules/@stdlib/stats/strided/dvariancetk/docs/img/equation_unbiased_sample_variance_textbook.svg" alt="Equation for the unbiased sample variance (one-pass textbook formula).">
    <br>
</div> -->

<!-- </equation> -->

The use of the term `n-1` is commonly referred to as Bessel's correction. Note, however, that applying Bessel's correction can increase the mean squared error between the sample variance and population variance. Depending on the characteristics of the population distribution, other correction factors (e.g., `n-1.5`, `n+1`, etc) can yield better estimators.

</section>

<!-- /.intro -->

<section class="installation">

## Installation

```bash
npm install @stdlib/stats-strided-dvariancetk
```

Alternatively,

-   To load the package in a website via a `script` tag without installation and bundlers, use the [ES Module][es-module] available on the [`esm`][esm-url] branch (see [README][esm-readme]).
-   If you are using Deno, visit the [`deno`][deno-url] branch (see [README][deno-readme] for usage intructions).
-   For use in Observable, or in browser/node environments, use the [Universal Module Definition (UMD)][umd] build available on the [`umd`][umd-url] branch (see [README][umd-readme]).

The [branches.md][branches-url] file summarizes the available branches and displays a diagram illustrating their relationships.

To view installation and usage instructions specific to each branch build, be sure to explicitly navigate to the respective README files on each branch, as linked to above.

</section>

<section class="usage">

## Usage

```javascript
var dvariancetk = require( '@stdlib/stats-strided-dvariancetk' );
```

#### dvariancetk( N, correction, x, strideX )

Computes the [variance][variance] of a double-precision floating-point strided array `x` using a one-pass textbook algorithm.

```javascript
var Float64Array = require( '@stdlib/array-float64' );

var x = new Float64Array( [ 1.0, -2.0, 2.0 ] );

var v = dvariancetk( x.length, 1, x, 1 );
// returns ~4.3333
```

The function has the following parameters:

-   **N**: number of indexed elements.
-   **correction**: degrees of freedom adjustment. Setting this parameter to a value other than `0` has the effect of adjusting the divisor during the calculation of the [variance][variance] according to `N-c` where `c` corresponds to the provided degrees of freedom adjustment. When computing the [variance][variance] of a population, setting this parameter to `0` is the standard choice (i.e., the provided array contains data constituting an entire population). When computing the unbiased sample [variance][variance], setting this parameter to `1` is the standard choice (i.e., the provided array contains data sampled from a larger population; this is commonly referred to as Bessel's correction).
-   **x**: input [`Float64Array`][@stdlib/array/float64].
-   **strideX**: stride length for `x`.

The `N` and stride parameters determine which elements in the strided array are accessed at runtime. For example, to compute the [variance][variance] of every other element in `x`,

```javascript
var Float64Array = require( '@stdlib/array-float64' );

var x = new Float64Array( [ 1.0, 2.0, 2.0, -7.0, -2.0, 3.0, 4.0, 2.0 ] );

var v = dvariancetk( 4, 1, x, 2 );
// returns 6.25
```

Note that indexing is relative to the first index. To introduce an offset, use [`typed array`][mdn-typed-array] views.

<!-- eslint-disable stdlib/capitalized-comments -->

```javascript
var Float64Array = require( '@stdlib/array-float64' );

var x0 = new Float64Array( [ 2.0, 1.0, 2.0, -2.0, -2.0, 2.0, 3.0, 4.0 ] );
var x1 = new Float64Array( x0.buffer, x0.BYTES_PER_ELEMENT*1 ); // start at 2nd element

var v = dvariancetk( 4, 1, x1, 2 );
// returns 6.25
```

#### dvariancetk.ndarray( N, correction, x, strideX, offsetX )

Computes the [variance][variance] of a double-precision floating-point strided array using a one-pass textbook algorithm and alternative indexing semantics.

```javascript
var Float64Array = require( '@stdlib/array-float64' );

var x = new Float64Array( [ 1.0, -2.0, 2.0 ] );

var v = dvariancetk.ndarray( x.length, 1, x, 1, 0 );
// returns ~4.33333
```

The function has the following additional parameters:

-   **offsetX**: starting index for `x`.

While [`typed array`][mdn-typed-array] views mandate a view offset based on the underlying buffer, the offset parameter supports indexing semantics based on a starting index. For example, to calculate the [variance][variance] for every other value in the strided array starting from the second value

```javascript
var Float64Array = require( '@stdlib/array-float64' );

var x = new Float64Array( [ 2.0, 1.0, 2.0, -2.0, -2.0, 2.0, 3.0, 4.0 ] );

var v = dvariancetk.ndarray( 4, 1, x, 2, 1 );
// returns 6.25
```

</section>

<!-- /.usage -->

<section class="notes">

## Notes

-   If `N <= 0`, both functions return `NaN`.
-   If `N - c` is less than or equal to `0` (where `c` corresponds to the provided degrees of freedom adjustment), both functions return `NaN`.
-   Some caution should be exercised when using the one-pass textbook algorithm. Literature overwhelmingly discourages the algorithm's use for two reasons: 1) the lack of safeguards against underflow and overflow and 2) the risk of catastrophic cancellation when subtracting the two sums if the sums are large and the variance small. These concerns have merit; however, the one-pass textbook algorithm should not be dismissed outright. For data distributions with a moderately large standard deviation to mean ratio (i.e., **coefficient of variation**), the one-pass textbook algorithm may be acceptable, especially when performance is paramount and some precision loss is acceptable (including a risk of returning a negative variance due to floating-point rounding errors!). In short, no single "best" algorithm for computing the variance exists. The "best" algorithm depends on the underlying data distribution, your performance requirements, and your minimum precision requirements. When evaluating which algorithm to use, consider the relative pros and cons, and choose the algorithm which best serves your needs.

</section>

<!-- /.notes -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```javascript
var discreteUniform = require( '@stdlib/random-array-discrete-uniform' );
var dvariancetk = require( '@stdlib/stats-strided-dvariancetk' );

var x = discreteUniform( 10, -50, 50, {
    'dtype': 'float64'
});
console.log( x );

var v = dvariancetk( x.length, 1, x, 1 );
console.log( v );
```

</section>

<!-- /.examples -->

<!-- C interface documentation. -->

* * *

<section class="c">

## C APIs

<!-- Section to include introductory text. Make sure to keep an empty line after the intro `section` element and another before the `/section` close. -->

<section class="intro">

</section>

<!-- /.intro -->

<!-- C usage documentation. -->

<section class="usage">

### Usage

```c
#include "stdlib/stats/strided/dvariancetk.h"
```

#### stdlib_strided_dvariancetk( N, correction, \*X, strideX )

Computes the [variance][variance] of a double-precision floating-point strided array using a one-pass textbook algorithm.

```c
const double x[] = { 1.0, -2.0, 2.0 };

double v = stdlib_strided_dvariancetk( 3, 1.0, x, 1 );
// returns ~4.3333
```

The function accepts the following arguments:

-   **N**: `[in] CBLAS_INT` number of indexed elements.
-   **correction**: `[in] double` degrees of freedom adjustment. Setting this parameter to a value other than `0` has the effect of adjusting the divisor during the calculation of the [variance][variance] according to `N-c` where `c` corresponds to the provided degrees of freedom adjustment. When computing the [variance][variance] of a population, setting this parameter to `0` is the standard choice (i.e., the provided array contains data constituting an entire population). When computing the unbiased sample [variance][variance], setting this parameter to `1` is the standard choice (i.e., the provided array contains data sampled from a larger population; this is commonly referred to as Bessel's correction).
-   **X**: `[in] double*` input array.
-   **strideX**: `[in] CBLAS_INT` stride length for `X`.

```c
double stdlib_strided_dvariancetk( const CBLAS_INT N, const double correction, const double *X, const CBLAS_INT strideX );
```

#### stdlib_strided_dvariancetk_ndarray( N, correction, \*X, strideX, offsetX )

Computes the [variance][variance] of a double-precision floating-point strided array using a one-pass textbook algorithm and alternative indexing semantics.

```c
const double x[] = { 1.0, -2.0, 2.0 };

double v = stdlib_strided_dvariancetk_ndarray( 3, 1.0, x, 1, 0 );
// returns ~4.3333
```

The function accepts the following arguments:

-   **N**: `[in] CBLAS_INT` number of indexed elements.
-   **correction**: `[in] double` degrees of freedom adjustment. Setting this parameter to a value other than `0` has the effect of adjusting the divisor during the calculation of the [variance][variance] according to `N-c` where `c` corresponds to the provided degrees of freedom adjustment. When computing the [variance][variance] of a population, setting this parameter to `0` is the standard choice (i.e., the provided array contains data constituting an entire population). When computing the unbiased sample [variance][variance], setting this parameter to `1` is the standard choice (i.e., the provided array contains data sampled from a larger population; this is commonly referred to as Bessel's correction).
-   **X**: `[in] double*` input array.
-   **strideX**: `[in] CBLAS_INT` stride length for `X`.
-   **offsetX**: `[in] CBLAS_INT` starting index for `X`.

```c
double stdlib_strided_dvariancetk_ndarray( const CBLAS_INT N, const double correction, const double *X, const CBLAS_INT strideX, const CBLAS_INT offsetX );
```

</section>

<!-- /.usage -->

<!-- C API usage notes. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="notes">

</section>

<!-- /.notes -->

<!-- C API usage examples. -->

<section class="examples">

### Examples

```c
#include "stdlib/stats/strided/dvariancetk.h"
#include <stdio.h>

int main( void ) {
    // Create a strided array:
    const double x[] = { 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0 };

    // Specify the number of elements:
    const int N = 4;

    // Specify the stride length:
    const int strideX = 2;

    // Compute the variance:
    double v = stdlib_strided_dvariancetk( N, 1, x, strideX );

    // Print the result:
    printf( "sample variance: %lf\n", v );
}
```

</section>

<!-- /.examples -->

</section>

<!-- /.c -->

* * *

<section class="references">

## References

-   Ling, Robert F. 1974. "Comparison of Several Algorithms for Computing Sample Means and Variances." _Journal of the American Statistical Association_ 69 (348). American Statistical Association, Taylor & Francis, Ltd.: 859–66. doi:[10.2307/2286154][@ling:1974a].

</section>

<!-- /.references -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

* * *

## See Also

-   <span class="package-name">[`@stdlib/stats-strided/dnanvariancetk`][@stdlib/stats/strided/dnanvariancetk]</span><span class="delimiter">: </span><span class="description">calculate the variance of a double-precision floating-point strided array ignoring NaN values and using a one-pass textbook algorithm.</span>
-   <span class="package-name">[`@stdlib/stats-strided/dstdevtk`][@stdlib/stats/strided/dstdevtk]</span><span class="delimiter">: </span><span class="description">calculate the standard deviation of a double-precision floating-point strided array using a one-pass textbook algorithm.</span>
-   <span class="package-name">[`@stdlib/stats-strided/dvariance`][@stdlib/stats/strided/dvariance]</span><span class="delimiter">: </span><span class="description">calculate the variance of a double-precision floating-point strided array.</span>
-   <span class="package-name">[`@stdlib/stats-strided/svariancetk`][@stdlib/stats/strided/svariancetk]</span><span class="delimiter">: </span><span class="description">calculate the variance of a single-precision floating-point strided array using a one-pass textbook algorithm.</span>
-   <span class="package-name">[`@stdlib/stats-strided/variancetk`][@stdlib/stats/strided/variancetk]</span><span class="delimiter">: </span><span class="description">calculate the variance of a strided array using a one-pass textbook algorithm.</span>

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library for JavaScript and Node.js, with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2025. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/stats-strided-dvariancetk.svg
[npm-url]: https://npmjs.org/package/@stdlib/stats-strided-dvariancetk

[test-image]: https://github.com/stdlib-js/stats-strided-dvariancetk/actions/workflows/test.yml/badge.svg?branch=main
[test-url]: https://github.com/stdlib-js/stats-strided-dvariancetk/actions/workflows/test.yml?query=branch:main

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/stats-strided-dvariancetk/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/stats-strided-dvariancetk?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/stats-strided-dvariancetk.svg
[dependencies-url]: https://david-dm.org/stdlib-js/stats-strided-dvariancetk/main

-->

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://app.gitter.im/#/room/#stdlib-js_stdlib:gitter.im

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/stats-strided-dvariancetk/tree/deno
[deno-readme]: https://github.com/stdlib-js/stats-strided-dvariancetk/blob/deno/README.md
[umd-url]: https://github.com/stdlib-js/stats-strided-dvariancetk/tree/umd
[umd-readme]: https://github.com/stdlib-js/stats-strided-dvariancetk/blob/umd/README.md
[esm-url]: https://github.com/stdlib-js/stats-strided-dvariancetk/tree/esm
[esm-readme]: https://github.com/stdlib-js/stats-strided-dvariancetk/blob/esm/README.md
[branches-url]: https://github.com/stdlib-js/stats-strided-dvariancetk/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/stats-strided-dvariancetk/main/LICENSE

[variance]: https://en.wikipedia.org/wiki/Variance

[@stdlib/array/float64]: https://github.com/stdlib-js/array-float64

[mdn-typed-array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray

[@ling:1974a]: https://doi.org/10.2307/2286154

<!-- <related-links> -->

[@stdlib/stats/strided/dnanvariancetk]: https://github.com/stdlib-js/stats-strided-dnanvariancetk

[@stdlib/stats/strided/dstdevtk]: https://github.com/stdlib-js/stats-strided-dstdevtk

[@stdlib/stats/strided/dvariance]: https://github.com/stdlib-js/stats-strided-dvariance

[@stdlib/stats/strided/svariancetk]: https://github.com/stdlib-js/stats-strided-svariancetk

[@stdlib/stats/strided/variancetk]: https://github.com/stdlib-js/stats-strided-variancetk

<!-- </related-links> -->

</section>

<!-- /.links -->
