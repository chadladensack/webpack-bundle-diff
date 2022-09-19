# webpack-bundle-diff

I wanted a way to output the bundle size diff within a pull request. Instead of including support the diff
the bundles within the project, I opted to keep the diffing logic outside of the main project.

### Usage
```
- name: Webpack Bundle Diff
  id: webpack_bundle_diff
  uses: chadladensack/webpack-bundle-diff@v1.0.0
  with:
    baselineUrl: https://location-of-stats-file-to-act-as-baseline.com
    compareUrl: https://location-of-stats-file-to-compare-against-the-baseline.com

- name: Add report stats as comment
  id: comment_to_pr
  uses: marocchino/sticky-pull-request-comment@v2.0.0
  with:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    number: ${{ github.event.pull_request.number }}
    header: Bundle Diff Report
    message: ${{ steps.webpack_bundle_diff.outputs.report }}
```
