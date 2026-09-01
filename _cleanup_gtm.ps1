$root = 'C:\Users\Chi Fung\chifungtech.github.io'
$files = Get-ChildItem -Path $root -Filter *.html

foreach ($p in $files) {
    $text = [System.IO.File]::ReadAllText($p.FullName)
    $text = $text -replace '(?s)\s*<link rel="preconnect" href="https://www\.googletagmanager\.com" />\s*<link rel="dns-prefetch" href="https://www\.googletagmanager\.com" />', ''
    $text = $text -replace '(?s)\s*<!-- Google tag \(gtag\.js\) -->\s*<script defer src="https://www\.googletagmanager\.com/gtag/js\?id=AW-18321476060"></script>', ''
    $text = $text -replace '\s*<script defer src="https://www\.googletagmanager\.com/gtag/js\?id=AW-18321476060"></script>', ''
    [System.IO.File]::WriteAllText($p.FullName, $text, [System.Text.UTF8Encoding]::new($false))
}

$jsPath = Join-Path $root 'site.js'
$jsText = [System.IO.File]::ReadAllText($jsPath)
$jsText = $jsText -replace '(?s)^window\.dataLayer.*?gtag\(''config'', ''AW-18321476060''\);\s*', ''
[System.IO.File]::WriteAllText($jsPath, $jsText, [System.Text.UTF8Encoding]::new($false))
Write-Output 'GTM cleanup complete'
