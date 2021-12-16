const fs = require(`fs`)
const yaml = require(`js-yaml`)

exports.createPages = ({ actions }) => {
  const { createPage } = actions
  const ymlDoc = yaml.safeLoad(fs.readFileSync(`./src/content/index.yaml`, `utf-8`))
  ymlDoc.forEach(element => {
    createPage({
      path: element.path,
      component: require.resolve(`./src/templates/basicTemplate.js`),
      context: {
        pageContent: element.content,
        links: element.links,
      },
    })
  })
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /p5/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}