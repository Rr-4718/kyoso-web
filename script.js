/* ========================================
   JavaScriptの初期化
   ======================================== */

// DOMContentLoaded イベント：ページの読み込みが完了したら実行
document.addEventListener('DOMContentLoaded', function() {
    // 各機能を初期化
    initSmoothScroll();
    initMenuToggle();
    initScrollAnimation();
    debugLog('ページの初期化が完了しました');
});

/* ========================================
   機能1: スムーズなスクロール
   ======================================== */

/**
 * スムーズなスクロール機能の初期化
 * ナビゲーションのリンクをクリックしたときに、
 * スムーズに目的のセクションへスクロールします
 */
function initSmoothScroll() {
    // すべてのアンカーリンク（#で始まるリンク）を取得
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
        // 各リンクにクリックイベントを設定
        link.addEventListener('click', function(event) {
            // デフォルトの動作を止める
            event.preventDefault();
            
            // クリックされたリンクのhref属性から対象セクションのIDを取得
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            // 対象セクションが存在する場合、スクロール
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',  // スムーズなスクロール
                    block: 'start'       // ページの上部に配置
                });
                
                // モバイルでメニューが開いている場合は閉じる
                const menuToggle = document.getElementById('menu-toggle');
                if (menuToggle.checked) {
                    menuToggle.checked = false;
                }
                
                debugLog('セクション ' + targetId + ' にスクロールしました');
            }
        });
    });
}

/* ========================================
   機能2: メニュートグル（モバイル対応）
   ======================================== */

/**
 * モバイルメニューのトグル機能を初期化
 * スマートフォンの狭い画面でメニューが開閉できるようにします
 */
function initMenuToggle() {
    // ハンバーガーメニューチェックボックスを取得
    const menuToggle = document.getElementById('menu-toggle');
    
    // ウィンドウサイズが変わったときの処理
    window.addEventListener('resize', function() {
        // 画面幅が768px以上の場合、メニューを閉じる
        if (window.innerWidth > 768) {
            menuToggle.checked = false;
            debugLog('画面サイズが変更されました - メニューを閉じています');
        }
    });
}

/* ========================================
   機能3: スクロール時のアニメーション
   ======================================== */

/**
 * スクロール時のアニメーション機能を初期化
 * ページをスクロールするとき、要素がビューポートに入ったときに
 * フェードインアニメーションが再生されます
 */
function initScrollAnimation() {
    // アニメーション対象の要素を取得
    const animateElements = document.querySelectorAll(
        '.feature-card, .learning-card, .cta-content'
    );
    
    // IntersectionObserver を使用（要素がビューポートに入ったかを検出）
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            // 要素がビューポートに入った場合
            if (entry.isIntersecting) {
                // 'visible' クラスを追加（CSSでフェードイン）
                entry.target.classList.add('visible');
                
                // 一度アニメーションしたら監視を終了
                observer.unobserve(entry.target);
            }
        });
    }, {
        // ビューポートに完全に入らなくても、部分的に入ったら発火
        threshold: 0.1
    });
    
    // 各要素を監視開始
    animateElements.forEach(function(element) {
        observer.observe(element);
    });
}

/* ========================================
   ユーティリティ関数
   ======================================== */

/**
 * 要素にクラスを追加する関数
 * @param {Element} element - 対象要素
 * @param {string} className - 追加するクラス名
 */
function addClass(element, className) {
    if (element.classList) {
        element.classList.add(className);
    }
}

/**
 * 要素からクラスを削除する関数
 * @param {Element} element - 対象要素
 * @param {string} className - 削除するクラス名
 */
function removeClass(element, className) {
    if (element.classList) {
        element.classList.remove(className);
    }
}

/**
 * コンソールにログを出力（デバッグ用）
 * 開発者ツール（F12）のコンソールでメッセージが表示されます
 */
function debugLog(message) {
    console.log('[つくば市サイト] ' + message);
}

// ページ読み込み完了ログ
debugLog('つくば市紹介ページが正常に読み込まれました');
