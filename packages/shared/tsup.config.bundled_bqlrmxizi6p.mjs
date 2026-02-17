// tsup.config.ts
import { defineConfig } from "tsup";
import { sassPlugin, postcssModules } from "esbuild-sass-plugin";
var tsup_config_default = defineConfig({
  entry: ["src/**/*.ts", "src/**/*.tsx"],
  dts: {
    entry: "src/index.ts"
  },
  format: ["cjs", "esm"],
  sourcemap: true,
  clean: true,
  minify: true,
  target: "esnext",
  keepNames: true,
  external: ["react", "react-dom"],
  esbuildPlugins: [
    sassPlugin({
      filter: /\.module\.(s[ac]ss|css)$/,
      type: "css",
      transform: postcssModules({
        generateScopedName: "[name]__[local]___[hash:base64:5]"
      })
    }),
    sassPlugin({
      filter: /\.s[ac]ss$/,
      type: "css"
    })
  ],
  splitting: true,
  treeshake: true,
  outDir: "dist"
});
export {
  tsup_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidHN1cC5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiQzpcXFxcR2l0XFxcXGZ5aVxcXFxwYWNrYWdlc1xcXFxzaGFyZWRcXFxcdHN1cC5jb25maWcudHNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiQzpcXFxcR2l0XFxcXGZ5aVxcXFxwYWNrYWdlc1xcXFxzaGFyZWRcIjtjb25zdCBfX2luamVjdGVkX2ltcG9ydF9tZXRhX3VybF9fID0gXCJmaWxlOi8vL0M6L0dpdC9meWkvcGFja2FnZXMvc2hhcmVkL3RzdXAuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndHN1cCdcclxuaW1wb3J0IHsgc2Fzc1BsdWdpbiwgcG9zdGNzc01vZHVsZXMgfSBmcm9tICdlc2J1aWxkLXNhc3MtcGx1Z2luJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuXHRlbnRyeTogWydzcmMvKiovKi50cycsICdzcmMvKiovKi50c3gnXSxcclxuXHRkdHM6IHtcclxuXHRcdGVudHJ5OiAnc3JjL2luZGV4LnRzJyxcclxuXHR9LFxyXG5cdGZvcm1hdDogWydjanMnLCAnZXNtJ10sXHJcblx0c291cmNlbWFwOiB0cnVlLFxyXG5cdGNsZWFuOiB0cnVlLFxyXG5cdG1pbmlmeTogdHJ1ZSxcclxuXHR0YXJnZXQ6ICdlc25leHQnLFxyXG5cdGtlZXBOYW1lczogdHJ1ZSxcclxuXHRleHRlcm5hbDogWydyZWFjdCcsICdyZWFjdC1kb20nXSxcclxuXHRlc2J1aWxkUGx1Z2luczogW1xyXG5cdFx0c2Fzc1BsdWdpbih7XHJcblx0XHRcdGZpbHRlcjogL1xcLm1vZHVsZVxcLihzW2FjXXNzfGNzcykkLyxcclxuXHRcdFx0dHlwZTogJ2NzcycsXHJcblx0XHRcdHRyYW5zZm9ybTogcG9zdGNzc01vZHVsZXMoe1xyXG5cdFx0XHRcdGdlbmVyYXRlU2NvcGVkTmFtZTogJ1tuYW1lXV9fW2xvY2FsXV9fX1toYXNoOmJhc2U2NDo1XScsXHJcblx0XHRcdH0pLFxyXG5cdFx0fSksXHJcblx0XHRzYXNzUGx1Z2luKHtcclxuXHRcdFx0ZmlsdGVyOiAvXFwuc1thY11zcyQvLFxyXG5cdFx0XHR0eXBlOiAnY3NzJyxcclxuXHRcdH0pLFxyXG5cdF0sXHJcblx0c3BsaXR0aW5nOiB0cnVlLFxyXG5cdHRyZWVzaGFrZTogdHJ1ZSxcclxuXHRvdXREaXI6ICdkaXN0JyxcclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzTyxTQUFTLG9CQUFvQjtBQUNuUSxTQUFTLFlBQVksc0JBQXNCO0FBRTNDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzNCLE9BQU8sQ0FBQyxlQUFlLGNBQWM7QUFBQSxFQUNyQyxLQUFLO0FBQUEsSUFDSixPQUFPO0FBQUEsRUFDUjtBQUFBLEVBQ0EsUUFBUSxDQUFDLE9BQU8sS0FBSztBQUFBLEVBQ3JCLFdBQVc7QUFBQSxFQUNYLE9BQU87QUFBQSxFQUNQLFFBQVE7QUFBQSxFQUNSLFFBQVE7QUFBQSxFQUNSLFdBQVc7QUFBQSxFQUNYLFVBQVUsQ0FBQyxTQUFTLFdBQVc7QUFBQSxFQUMvQixnQkFBZ0I7QUFBQSxJQUNmLFdBQVc7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLFdBQVcsZUFBZTtBQUFBLFFBQ3pCLG9CQUFvQjtBQUFBLE1BQ3JCLENBQUM7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLE1BQU07QUFBQSxJQUNQLENBQUM7QUFBQSxFQUNGO0FBQUEsRUFDQSxXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsRUFDWCxRQUFRO0FBQ1QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
